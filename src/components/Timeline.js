import React, { Component } from 'react'
import { GoPrimitiveDot } from "react-icons/go"
import NiceDatePicker from "./DatePicker"
import moment from "moment";
import { GET_STANDUP_RESPONSES, GET_CHANNEL_MEMBERS } from "./../graphql/queries"
import { executeOperation } from "./../graphql/helpers"
import { InsightsLoader } from "./LoaderPage"
import stc from 'string-to-color';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberProfileMap: new Map(),
            memberProfiles: null,
            standupRuns: null,
            questionsMap: new Map(),
            questions: null,
            currentStandupIndex: 0,
            allChecked: true,
            selectedQuestions: null,
            checkQuestions: null,
        }
    }

    isResponseSubmitted = (standupRunId, slackUserId) => {
        const { standupRuns } = this.state;
        const srObj = standupRuns
            .find(standupRun => standupRun.id === standupRunId)
        if (!srObj)
            return false;
        const res = (srObj && srObj.responses
            .filter(response => response.slackuser_id === slackUserId)) || [];
        return res.length !== 0

    }
    isResponseSubmittedForQuestion = (standupRunId, questionId, slackUserId) => {
        const { standupRuns } = this.state;
        const srObj = standupRuns
            .find(standupRun => standupRun.id === standupRunId)
        if (!srObj)
            return false;
        const res = (srObj && srObj.responses
            .filter(response => response.slackuser_id === slackUserId &&
                response.question_id === questionId)) || [];
        return res.length !== 0
    }

    getResponseSubmittedForQuestion = (standupRunId, questionId, slackUserId) => {
        const { standupRuns } = this.state;
        const srObj = standupRuns
            .find(standupRun => standupRun.id === standupRunId)
        if (!srObj)
            return false;
        const res = (srObj && srObj.responses
            .filter(response => response.slackuser_id === slackUserId &&
                response.question_id === questionId)) || [];
        // console.log('))', standupRunId, questionId, slackUserId, res);
        return res;
    }

    fetchStandupRuns = async () => {
        const { standup_id } = this.props;
        // console.log('dasd', standup_id)
        let res1 = await executeOperation(
            { standup_id },
            GET_STANDUP_RESPONSES
        );
        let res2 = await executeOperation(
            { channel: res1.data.standup_by_pk.channel },
            GET_CHANNEL_MEMBERS
        );
        // console.log(res2.data.getMembers);
        this.setState({
            standupRuns: res1.data.standup_by_pk.standup_runs
                .map(standup_run => {
                    return {
                        id: standup_run.id, created_at: standup_run.created_at,
                        responses: standup_run.responses
                    }
                }),
            questions: res1.data.standup_by_pk.questions,
            selectedQuestions: res1.data.standup_by_pk.questions
                .map(question => question.id),
            checkQuestons: Array(res1.data.standup_by_pk.questions.length)
                .fill(true)
        }, () => {
            let memberProfileMap = new Map();
            let memberProfiles = [];
            // console.log(res2);
            const { ids, images, real_names } = res2.data.getMembers;

            ids.forEach((id, index) => {
                memberProfileMap.set(id, {
                    id, image: images[index],
                    real_name: real_names[index]
                });
                memberProfiles.push({
                    id, image: images[index],
                    real_name: real_names[index]
                });
            })
            this.setState({ memberProfileMap, memberProfiles })
        });
    }
    // toggleQuestion = (event) => {
    //     const questionId = event.target.dataset.questionId;
    //     if (!questionId)
    //         return;
    //     let selectedQuestions = this.state.selectedQuestions;
    //     const { questions } = this.state;
    //     console.log(questionId);

    //     let zInd = 0;
    //     questions.forEach((question, index) => {
    //         if (question.id === questionId)
    //             zInd = index;
    //     })

    //     if (selectedQuestions.includes(questionId)) {
    //         let z = selectedQuestions.indexOf(questionId)
    //         this.setState({
    //             selectedQuestions: selectedQuestions.splice(z, 1), checkQuestions: this.state.checkQuestions.map((q, ind) => {
    //                 return ind === z ? q : false
    //             })
    //         })
    //     }
    //     else {
    //         this.setState({
    //             selectedQuestions: selectedQuestions.concat([questionId]), checkQuestions: this.state.checkQuestions.map((q, ind) => {
    //                 return ind === zInd ? q : true
    //             })
    //         });
    //     }
    // }

    componentDidMount() {
        this.fetchStandupRuns();
    }
    render() {
        const { questions, memberProfileMap, memberProfiles, standupRuns,
            selectedQuestions, checkQuestons } = this.state;

        return (
            <>
                {
                    standupRuns && memberProfiles && memberProfileMap && questions ? (
                        <div className="bg-white animate-fadesunnyin">
                            <div className="flex flex-wrap space-x-3 mt-4">
                                <div className="flex-auto p-4 px-3 min-w-3/5">

                                    {
                                        standupRuns.filter(standupRun => standupRun.responses.length !== 0).map(standupRun => (
                                            <div className="rounded-lg my-2" key={standupRun.id}>
                                                <div className="relative m-0 p-0 clear-both text-center leading-4  
                                                text-gray-700 text-base font-bold">

                                                    <div className="bg-white inline-block relative px-4 py-1 mx-auto mt-1">
                                                        {
                                                            moment(standupRun.created_at || Date.now()).format("dddd") +
                                                            ", " +

                                                            moment(standupRun.created_at || Date.now()).format("LL")
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    memberProfiles
                                                        .filter(memberProfile => this.isResponseSubmitted(standupRun.id, memberProfile.id))
                                                        .map(memberProfile => (
                                                            <div className="mb-2" key={memberProfile.id}>
                                                                <div className="flex py-4 items-center">
                                                                    <div className="flex flex-2">
                                                                        <img className="w-16 h-16 m-0 rounded-circle"
                                                                            alt={memberProfile.real_name}
                                                                            title={memberProfile.real_name}
                                                                            src={memberProfile.image} />
                                                                    </div>
                                                                    <div className="w-full ml-2">
                                                                        <span className="leading-6 font-bold text-xl  
                                                                        text-gray-700">{memberProfile.real_name}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="pr-10 pl-12">
                                                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                                                        {
                                                                            questions.filter(question => selectedQuestions.includes(question.id)).map(question => (
                                                                                <div className="relative my-4 px-3" key={question.index}>
                                                                                    <div className="absolute left-0 w-1 h-full rounded"
                                                                                        style={{ backgroundColor: stc(question.body) }} >

                                                                                    </div>
                                                                                    <div className="w-full ml-2">
                                                                                        <h4 className="leading-6 font-bold text-lg  text-gray-700">
                                                                                            {question.body}
                                                                                        </h4>
                                                                                        <p className="text-lg text-gray-600">
                                                                                            {this.getResponseSubmittedForQuestion(standupRun.id,
                                                                                                question.id, memberProfile.id).length ?
                                                                                                this.getResponseSubmittedForQuestion(standupRun.id, question.id, memberProfile.id)[0].body :
                                                                                                'No response submitted'}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                            )
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        )
                                                }

                                            </div>
                                        ))
                                    }



                                </div>
                                <div className="flex-auto p-4 px-3" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                                    <div className=" rounded-lg p-6 mb-8">
                                        <h2 className="leading-6 font-bold text-xl mb-4 text-gray-700">
                                            Date Range
                                        </h2>
                                        <div className="flex flex-col mb-8">
                                            <NiceDatePicker />
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex items-baseline justify-between">
                                                <h2 className="leading-6 font-bold text-xl  mb-4 text-gray-700">
                                                    Participants
                                                </h2>
                                                <div class="flex items-center">
                                                    <label htmlFor="remember_me" className="mr-2 block text-sm leading-5 text-gray-900">
                                                        All
                                                    </label>
                                                    <input
                                                        defaultChecked={true}
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />

                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                {
                                                    memberProfiles.map(memberProfile => (
                                                        <div className="flex items-center text-sm mb-2" key={memberProfile.id}>
                                                            <div className="mr-2 flex-3">
                                                                <img className="w-8 h-8 m-0 rounded-circle"
                                                                    alt={memberProfile.real_name}
                                                                    title={memberProfile.real_name}
                                                                    src={memberProfile.image} />
                                                            </div>
                                                            <div className="flex-auto flex-wrap font-bold text-gray-600">
                                                                {"@" + memberProfile.real_name}
                                                            </div>
                                                            <div className="flex items-center">

                                                                <input
                                                                    defaultChecked={true}
                                                                    type="checkbox"
                                                                    className="form-checkbox h-4 w-4 text-teal-500 
                                                                    transition duration-150 ease-in-out" />

                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex items-baseline justify-between">
                                                <h2 className="leading-6 font-bold text-xl mb-4 text-gray-700">
                                                    Questions
                                                </h2>
                                                <div class="flex items-center">
                                                    <label htmlFor="remember_me" className="mr-2 block 
                                                    text-sm leading-5 text-gray-900">
                                                        All
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={true}
                                                        className="form-checkbox h-4 w-4 text-teal-500 transition 
                                                        duration-150 ease-in-out" />

                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                {
                                                    questions.map((question, index) => (
                                                        <div className="flex items-center text-sm mb-2"
                                                            key={question.id}>
                                                            <div className="flex-auto flex-wrap font-bold text-gray-600">
                                                                <GoPrimitiveDot
                                                                    className="inline-block mb-1 mr-2"
                                                                    style={{ color: stc(question.body) }} />
                                                                {question.body}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    data-question-id={question.id}
                                                                    data-question-index={index}
                                                                    // onChange={this.toggleQuestion}
                                                                    checked={checkQuestons[index]}
                                                                    type="checkbox"
                                                                    className="form-checkbox h-4 w-4 text-teal-500 
                                                                    transition duration-150 ease-in-out" />
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <InsightsLoader />
                }
            </>
        )
    }
}
export default Timeline
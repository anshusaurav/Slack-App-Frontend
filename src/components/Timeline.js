import React, { Component } from 'react'
import { GoPrimitiveDot } from "react-icons/go"
import NiceDatePicker from "./DatePicker"
import moment from "moment";
import { GET_STANDUP_RESPONSES } from "./../graphql/queries"
import { executeOperation } from "./../graphql/helpers"
import { InsightsLoader } from "./LoaderPage"
import stc from 'string-to-color';
import { RiCloudOffLine } from "react-icons/ri"

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberProfileMap: new Map(),
            memberProfiles: null,
            standupRuns: null,
            questions: null,
            currentStandupIndex: 0,
            selectedQuestionsMap: new Map(),
            selectedMembersMap: new Map(),
            selectedDatesMap: new Map(),
            selectAllQuestions: true,
            selectAllMembers: true,
            selectedStanduprunsMap: new Map(),
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
        return res;
    }

    fetchStandupRuns = async () => {
        const { standup_id } = this.props;
        let res1 = await executeOperation(
            { standup_id },
            GET_STANDUP_RESPONSES
        );

        const { channel } = res1.data.standup_by_pk;
        const { channelsIDmembersMap } = this.props;

        this.setState({
            standupRuns: res1.data.standup_by_pk.standup_runs
                .map(standup_run => {
                    return {
                        id: standup_run.id, created_at: standup_run.created_at,
                        responses: standup_run.responses
                    }
                }),
            selectedStanduprunsMap: new Map(res1.data.standup_by_pk.standup_runs
                .map(standup_run => (
                    [standup_run.id, true]
                )
                )),
            questions: res1.data.standup_by_pk.questions,
            selectedQuestionsMap: new Map(res1.data.standup_by_pk.questions
                .map(question => (
                    [question.id, true]
                )))

        }, () => {
            this.setState({
                memberProfiles: channelsIDmembersMap.get(channel).map(member => (
                    member
                )),
                selectedMembersMap: new Map(channelsIDmembersMap.get(channel).map(member => (
                    [member.id, true]
                )))
            })
        })
    }
    toggleQuestion = (event) => {

        const questionId = event.target.dataset.questionId;
        if (!questionId)
            return;
        const { standupRuns } = this.state;
        const selectedStanduprunsMap = new Map(this.state.selectedStanduprunsMap);
        let selectedQuestionsMap = new Map(this.state.selectedQuestionsMap);
        selectedQuestionsMap.set(questionId,
            !this.state.selectedQuestionsMap.get(questionId));
        standupRuns.forEach(standupRun => {
            let responses = [...standupRun.responses];
            responses = responses
                .filter(responses => selectedQuestionsMap.get(responses.question_id))
            if (responses.length) {
                selectedStanduprunsMap.set(standupRun.id, true);
            }
            else {
                selectedStanduprunsMap.set(standupRun.id, false);
            }
        })
        this.setState({ selectedQuestionsMap, selectedStanduprunsMap })
    }

    toggleAllQuestion = (event) => {
        const { questions, selectAllQuestions } = this.state;
        let selectedQuestionsMap = new Map(questions
            .map(question => (
                [question.id, !selectAllQuestions]
            ))
        );
        const { standupRuns } = this.state;
        const selectedStanduprunsMap = new Map(this.state.selectedStanduprunsMap);

        standupRuns.forEach(standupRun => {
            let responses = [...standupRun.responses];
            responses = responses
                .filter(responses => selectedQuestionsMap.get(responses.question_id))
            if (responses.length) {
                selectedStanduprunsMap.set(standupRun.id, true);
            }
            else {
                selectedStanduprunsMap.set(standupRun.id, false);
            }
        })
        this.setState({
            selectedQuestionsMap,
            selectAllQuestions: !selectAllQuestions,
            selectedStanduprunsMap
        })
    }

    toggleMember = (event) => {
        const memberId = event.target.dataset.memberId;
        if (!memberId)
            return;
        let selectedMembersMap = new Map(this.state.selectedMembersMap);
        selectedMembersMap.set(memberId,
            !this.state.selectedMembersMap.get(memberId));
        const { standupRuns } = this.state;
        const selectedStanduprunsMap = new Map(this.state.selectedStanduprunsMap);
        standupRuns.forEach(standupRun => {
            let responses = [...standupRun.responses];
            responses = responses
                .filter(responses => selectedMembersMap.get(responses.slackuser_id))
            if (responses.length) {
                selectedStanduprunsMap.set(standupRun.id, true);
            }
            else {
                selectedStanduprunsMap.set(standupRun.id, false);
            }
        })
        this.setState({ selectedMembersMap, selectedStanduprunsMap })
    }
    toggleAllMember = (event) => {
        const { memberProfiles, selectAllMembers } = this.state;
        let selectedMembersMap = new Map(memberProfiles
            .map(member => (
                [member.id, !selectAllMembers]
            ))
        );

        const { standupRuns } = this.state;
        const selectedStanduprunsMap = new Map(this.state.selectedStanduprunsMap);
        standupRuns.forEach(standupRun => {
            let responses = [...standupRun.responses];
            responses = responses
                .filter(responses => selectedMembersMap.get(responses.slackuser_id))
            if (responses.length) {
                selectedStanduprunsMap.set(standupRun.id, true);
            }
            else {
                selectedStanduprunsMap.set(standupRun.id, false);
            }
        })

        this.setState({
            selectedMembersMap,
            selectAllMembers: !selectAllMembers,
            selectedStanduprunsMap
        })
    }

    componentDidMount() {
        this.fetchStandupRuns();
    }
    render() {
        const { questions, memberProfileMap, memberProfiles, standupRuns,
            selectedQuestionsMap, selectAllQuestions, selectedMembersMap
            , selectAllMembers, selectedStanduprunsMap } = this.state;

        return (
            <>
                {
                    standupRuns && memberProfiles
                        && memberProfileMap
                        && questions && selectedQuestionsMap &&
                        selectedMembersMap ? (
                            <div className="bg-white animate-fadesunnyin">
                                <div className="flex flex-wrap">
                                    <div className="flex-auto p-4 px-3">
                                        {
                                            standupRuns
                                                .filter(standupRun => standupRun.responses.length !== 0
                                                    && selectedStanduprunsMap.get(standupRun.id)).length === 0 && (
                                                <div className="flex items-center justify-center mt-12">
                                                    <div className="max-w-16 flex justify-center flex-col">
                                                        <RiCloudOffLine className="w-full h-20 text-2xl text-bold m-1 text-gray-500 select-none text-center" />
                                                        <div>
                                                            <h3 className=" w-full font-bold text-center text-gray-700">No data to display yet!</h3>
                                                            <p className="w-full text-center text-gray-600">Timeline will kick in as soon as there is some activity in this standup</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        }
                                        {
                                            standupRuns
                                                .filter(standupRun => standupRun.responses.length !== 0
                                                    && selectedStanduprunsMap.get(standupRun.id))
                                                .map(standupRun => (
                                                    <div className="rounded-lg mb-2 mt-6"
                                                        key={standupRun.id}>
                                                        <div className="relative m-0 p-0 clear-both text-center leading-4  
                                                                text-gray-700 text-base font-bold">
                                                            <div className="absolute top-1 m-0 left-0 right-0 border-t border-gray"></div>
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
                                                                .filter(memberProfile => this.isResponseSubmitted(standupRun.id, memberProfile.id)
                                                                    && selectedMembersMap.get(memberProfile.id))
                                                                .map(memberProfile => (
                                                                    <div className="mb-2" key={memberProfile.id}>
                                                                        <div className="flex py-4 items-center">
                                                                            <div className="flex flex-2">
                                                                                <img className="w-16 h-16 m-0 rounded-circle"
                                                                                    alt={memberProfile.real_name}
                                                                                    title={memberProfile.real_name}
                                                                                    src={memberProfile.profile.image_72} />
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
                                                                                    questions
                                                                                        .filter(question => selectedQuestionsMap.get(question.id)).map(question => (
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
                                    <div className="flex-auto p-4 px-3 w-1/3 md:max-w-1/3" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                                        <div className=" rounded-lg p-6 mb-8">
                                            {/* <h2 className="leading-6 font-bold text-xl mb-4 text-gray-700">
                                                Date Range
                                        </h2>
                                            <div className="flex flex-col mb-8">
                                                <NiceDatePicker />
                                            </div> */}

                                            <div className="mb-8">
                                                <div className="flex items-baseline justify-between">
                                                    <h2 className="leading-6 font-bold text-xl  mb-4 text-gray-700">
                                                        Participants
                                                </h2>
                                                    <div className="flex items-center">
                                                        <label htmlFor="remember_me"
                                                            className="mr-2 block text-sm leading-5 text-gray-900">
                                                            All
                                                    </label>
                                                        <input
                                                            checked={selectAllMembers}
                                                            onChange={this.toggleAllMember}
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
                                                                        src={memberProfile.profile.image_72} />
                                                                </div>
                                                                <div className={`flex-auto flex-wrap font-bold  truncate pr-2 
                                                                ${selectedMembersMap.get(memberProfile.id) ? 'text-gray-600' : 'line-through text-gray-400'}`}>
                                                                    {"@" + memberProfile.real_name}
                                                                </div>
                                                                <div className="flex items-center">

                                                                    <input
                                                                        data-member-id={memberProfile.id}
                                                                        checked={selectedMembersMap.get(memberProfile.id)}
                                                                        onChange={this.toggleMember}
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
                                                    <div className="flex items-center">
                                                        <label htmlFor="remember_me" className="mr-2 block 
                                                    text-sm leading-5 text-gray-900">
                                                            All
                                                    </label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectAllQuestions}
                                                            onChange={this.toggleAllQuestion}
                                                            className="form-checkbox h-4 w-4 text-teal-500 transition 
                                                        duration-150 ease-in-out" />

                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    {
                                                        questions.map((question, index) => (
                                                            <div className="flex items-center text-sm mb-2"
                                                                key={question.id}>
                                                                <div className={`flex-auto flex-wrap font-bold  truncate pr-2 
                                                                ${selectedQuestionsMap.get(question.id) ? 'text-gray-600' : 'line-through text-gray-400'}`}>
                                                                    <GoPrimitiveDot
                                                                        className="inline-block mb-1 mr-2"
                                                                        style={{ color: stc(question.body) }} />
                                                                    {question.body}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <input
                                                                        data-question-id={question.id}
                                                                        onChange={this.toggleQuestion}
                                                                        checked={selectedQuestionsMap.get(question.id)}
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
import React, { Component } from "react";
import { GoPrimitiveDot } from "react-icons/go"
import PieChart from "./PieChart"
import stc from "string-to-color"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { GET_STANDUP_RESPONSES, GET_CHANNEL_MEMBERS } from "./../graphql/queries"
import { executeOperation, } from "./../graphql/helpers"
import { InsightsLoader } from "./LoaderPage"
import moment from "moment";
class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ date: 0, value: 100 }, { date: 0, value: 0 }],
            memberProfileMap: new Map(),
            standupRuns: null,
            questions: null,
            currentStanduprun: {},
            currentStandupIndex: 0,
            questionResponseMap: new Map(),

        }
    }
    getResponseForRunAndQuestion = (standupRunId, questionId) => {
        const { standupRuns } = this.state;
        const srObj = standupRuns.find(standupRun => standupRun.id === standupRunId)
        return (srObj && srObj.responses.filter(response => response.question_id === questionId)) || [];
    }


    fetchStandupRuns = async () => {
        const { standup_id } = this.props;
        // console.log('dasd', standup_id)
        let res1 = await executeOperation(
            { standup_id },
            GET_STANDUP_RESPONSES
        );
        console.log(res1);
        let res2 = await executeOperation(
            { channel: res1.data.standup_by_pk.channel },
            GET_CHANNEL_MEMBERS
        );
        console.log(res2)
        // console.log(res2.data.getMembers);
        this.setState({
            standupRuns: res1.data.standup_by_pk.standup_runs.map(standup_run => {
                return {
                    id: standup_run.id, created_at: standup_run.created_at,
                    responses: standup_run.responses
                }
            }),
            questions: res1.data.standup_by_pk.questions,
            currentStanduprun: res1.data.standup_by_pk.standup_runs[0]
        }, () => {
            let memberProfileMap = new Map();
            // console.log(res2);
            const { ids, images, real_names } = res2.data.getMembers;

            ids.forEach((id, index) => {
                memberProfileMap.set(id, {
                    id, image: images[index],
                    real_name: real_names[index]
                })
            })
            this.setState({ memberProfileMap })
        });
    }
    goToPrevRun = () => {
        const { standupRuns, currentStandupIndex } = this.state;
        this.setState({
            currentStandupIndex: currentStandupIndex === standupRuns.length - 1 ?
                currentStandupIndex : currentStandupIndex + 1
        })
    }
    goToNextrun = () => {
        const { standupRuns, currentStandupIndex } = this.state;
        console.log(standupRuns)
        this.setState({
            currentStandupIndex: currentStandupIndex === 0 ?
                currentStandupIndex : currentStandupIndex - 1
        })
    }
    componentDidMount() {
        this.fetchStandupRuns();
    }
    render() {
        const { questions, standupRuns, data,
            currentStandupIndex, memberProfileMap } = this.state;
        if (standupRuns)
            this.getResponseForRunAndQuestion("d990a1f3-3383-40f6-affa-ddac1a46a38a")
        return (
            <>
                {

                    standupRuns ? (
                        <div className="bg-white animate-fadesunnyin">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center select-none">
                                    {
                                        currentStandupIndex !== standupRuns.length - 1 && (<div>
                                            <button onClick={this.goToPrevRun} className="w-12 h-12 focus:outline-none  shadow-newtype rounded-full flex items-center justify-center">
                                                <HiArrowLeft className="inline-block text-xl text-bold m-1 text-gray-500 cursor-pointer" />
                                            </button>
                                        </div>)
                                    }
                                    <div className="mx-6  font-bold">
                                        {
                                            /* moment("2020-10-02T13:48:00.696962+00:00").format("dddd") +
                                            ", " + */
                                            moment(standupRuns[currentStandupIndex].created_at || Date.now()).format("LLLL")
                                        }
                                    </div>
                                    {
                                        currentStandupIndex !== 0 && (<div>
                                            <button onClick={this.goToNextrun} className="w-12 h-12 focus:outline-none  shadow-newtype rounded-full flex items-center justify-center">
                                                <HiArrowRight className="inline-block text-xl text-bold m-1 text-gray-500 cursor-pointer" />
                                            </button>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className="flex flex-wrap space-x-3 mt-4">
                                <div className="flex-auto p-4 px-3">
                                    {
                                        questions && questions.map(question => (
                                            <div className="border-solid border border-gray-400 rounded-lg mb-2">
                                                <div className="">
                                                    <div className="border-b border-gray-300 p-6">
                                                        <p className="font-bold text-xl tracking-wide">
                                                            <GoPrimitiveDot className="inline-block text-xl mb-1 mr-2"
                                                                style={{ color: stc(question.body) }} />
                                                            {question.body}
                                                        </p>
                                                    </div>
                                                    <div className="pr-10 pl-4">
                                                        <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>

                                                            {
                                                                this.getResponseForRunAndQuestion(standupRuns[currentStandupIndex].id, question.id).map(response => (
                                                                    <div className="flex py-4">
                                                                        <div className="flex flex-2">
                                                                            <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma"
                                                                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                                        </div>
                                                                        <div className="w-full ml-2">
                                                                            <h4 className="leading-6 font-bold text-lg tracking-wide">{response.slackuser_id}</h4>
                                                                            <p className="text-lg tracking-wide">{response.body}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="border-t flex justify-end p-6 text-gray-600 text-lg tracking-wide">
                                                        {this.getResponseForRunAndQuestion(standupRuns[currentStandupIndex].id, question.id).length === 0 ?
                                                            "No response yet" : this.getResponseForRunAndQuestion(standupRuns[currentStandupIndex].id, question.id).length + " responses"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="flex-auto p-4 px-3">
                                    <div className="border-solid border border-gray-400 rounded-lg p-6">
                                        <h2 className="leading-6 font-bold text-xl tracking-wider mb-4">
                                            Participation
                                                                    </h2>
                                        <div className="flex flex-col items-center">

                                            <PieChart data={data}
                                                width={240}
                                                height={240}
                                                innerRadius={96}
                                                outerRadius={120}>

                                            </PieChart>
                                            <p className="mt-6 tracking-wider">Reported: <strong>2</strong> people out of <strong>8</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (<InsightsLoader />)
                }
            </>
        )
    }
}
export default Insights
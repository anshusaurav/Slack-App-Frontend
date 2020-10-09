import React, { Component } from "react";
import { GoPrimitiveDot } from "react-icons/go"
import PieChart from "./PieChart"
import stc from "string-to-color"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { RiCloudOffLine } from "react-icons/ri"
import { GET_STANDUP_RESPONSES } from "./../graphql/queries"
import { executeOperation } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
import { InsightsLoader } from "./LoaderPage"
import moment from "moment";
class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // memberProfileMap: new Map(),
            standup: null,
            standupRuns: null,
            questions: null,
            currentStandupIndex: 0,

        }
    }
    getResponseForRunAndQuestion = (standupRunId, questionId) => {
        const { standupRuns } = this.state;
        const srObj = standupRuns
            .find(standupRun => standupRun.id === standupRunId)
        return (srObj && srObj.responses
            .filter(response => response.question_id === questionId)) || [];
    }
    getDataForChart = (standupRunId) => {
        const { standupRuns, standup } = this.state;
        const { channelsIDmembersMap } = this.props;
        const srObj = standupRuns
            .find(standupRun => standupRun.id === standupRunId);
        const v1 = remove_duplicates(srObj.responses
            .map(response => response.slackuser_id)).length || 0;
        const v2 = (channelsIDmembersMap.get(standup.channel)
            .map(e => e).length - v1) || 1;
        return [{ date: 0, value: v1 }, { date: 1, value: v2 }]
    }
    fetchStandupRuns = async () => {
        const { standup_id } = this.props;
        let res1 = await executeOperation(
            { standup_id },
            GET_STANDUP_RESPONSES
        );

        this.setState({
            standup: res1.data.standup_by_pk,
            standupRuns: res1.data.standup_by_pk
                .standup_runs
                .map(standup_run => {
                    return {
                        id: standup_run.id, created_at: standup_run.created_at,
                        responses: standup_run.responses
                    }
                }),
            questions: res1.data.standup_by_pk.questions
        });
    }
    goToPrevRun = () => {
        const { standupRuns, currentStandupIndex } = this.state;
        this.setState({
            currentStandupIndex: currentStandupIndex === standupRuns.length - 1 ?
                currentStandupIndex : currentStandupIndex + 1
        })
    }
    goToNextRun = () => {
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
        const { questions, standupRuns,
            currentStandupIndex } = this.state;
        const { membersMap } = this.props;
        return (
            <>
                {

                    standupRuns ? (

                        <div className="bg-white animate-fadesunnyin">
                            {
                                standupRuns.length ? (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center select-none">
                                                {
                                                    currentStandupIndex !== standupRuns.length - 1 && (
                                                        <div>
                                                            <button onClick={this.goToPrevRun}
                                                                className="w-12 h-12 focus:outline-none shadow-newtype 
                                                                rounded-full flex items-center justify-center">
                                                                <HiArrowLeft className="inline-block text-xl text-bold 
                                                                m-1 text-gray-500 cursor-pointer" />
                                                            </button>
                                                        </div>)
                                                }
                                                <div className="mx-6 font-bold text-gray-700">
                                                    {
                                                        /* moment("2020-10-02T13:48:00.696962+00:00").format("dddd") +
                                                        ", " + */
                                                        moment(standupRuns[currentStandupIndex].created_at || Date.now()).format("LL")
                                                    }
                                                </div>
                                                {
                                                    currentStandupIndex !== 0 && (<div>
                                                        <button onClick={this.goToNextRun}
                                                            className="w-12 h-12 focus:outline-none  shadow-newtype rounded-full flex 
                                                            items-center justify-center">
                                                            <HiArrowRight className="inline-block text-xl text-bold m-1 
                                                            text-gray-500 cursor-pointer" />
                                                        </button>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap space-x-3 mt-4">
                                            <div className="flex-auto p-4 px-3">
                                                {
                                                    questions && questions.map(question => (
                                                        <div className="border-solid border border-gray-400 rounded-lg mb-2" key={question.index}>
                                                            <div className="">
                                                                <div className="border-b border-gray-300 p-6">
                                                                    <p className="font-bold text-xl text-gray-700">
                                                                        <GoPrimitiveDot className="inline-block text-xl mb-1 mr-2"
                                                                            style={{ color: stc(question.body) }} />
                                                                        {question.body}
                                                                    </p>
                                                                </div>
                                                                <div className="pr-10 pl-4">
                                                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>

                                                                        {
                                                                            membersMap.size &&
                                                                            this.getResponseForRunAndQuestion(standupRuns[currentStandupIndex].id, question.id)
                                                                                .map((response, resI) => (
                                                                                    <div className="flex py-4" key={resI}>
                                                                                        <div className="flex flex-2">
                                                                                            <img className="w-16 h-16 m-0 rounded-circle"
                                                                                                alt={membersMap.get(response.slackuser_id).profile.real_name}
                                                                                                title={membersMap.get(response.slackuser_id).profile.real_name}
                                                                                                src={membersMap.get(response.slackuser_id).profile.image_72} />
                                                                                        </div>
                                                                                        <div className="w-full ml-2">
                                                                                            <h4 className="leading-6 font-bold text-lg text-gray-600">
                                                                                                {membersMap.get(response.slackuser_id).profile.real_name}
                                                                                            </h4>
                                                                                            <p className="text-lg text-gray-600">{response.body}</p>
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
                                                    <h2 className="leading-6 font-bold text-xl text-gray-700 mb-4">
                                                        Participation
                                                                    </h2>
                                                    <div className="flex flex-col items-center">

                                                        <PieChart data={this.getDataForChart(standupRuns[currentStandupIndex].id)}
                                                            width={240}
                                                            height={240}
                                                            innerRadius={96}
                                                            outerRadius={120}>

                                                        </PieChart>
                                                        <p className="mt-6 tracking-wider text-gray-600">Reported:
                                                <strong>
                                                                {this.getDataForChart(standupRuns[currentStandupIndex].id)[0].value}
                                                            </strong> people out of <strong>
                                                                {this.getDataForChart(standupRuns[currentStandupIndex].id)[1].value}</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div></>) : (
                                        <div className="flex items-center justify-center">
                                            <div className="max-w-16 flex justify-center flex-col">
                                                <RiCloudOffLine className="w-full h-20 text-2xl text-bold m-1 text-gray-500 select-none text-center" />
                                                <div>
                                                    <h3 className=" w-full font-bold text-center text-gray-700">No data to display yet!</h3>
                                                    <p className="w-full text-center text-gray-600">Insights will kick in as soon as there is some activity in this standup</p>
                                                </div>
                                            </div>

                                        </div>)
                            }

                        </div>

                    ) : (<InsightsLoader />)
                }
            </>
        )
    }
}
export default Insights
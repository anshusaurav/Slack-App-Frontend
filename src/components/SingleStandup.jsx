import React from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go"
import stc from 'string-to-color'
import { GET_SINGLE_STANDUP, GET_CHANNEL_MEMBERS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { MainSectionLoader } from "./LoaderPage"
import Timeline from "./Timeline"
import Insights from "./Insights"
import Sidebar from "./Sidebar";

class SingleStandup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            openTab: 2,
            standup: null,
            channelsIDNameMap: new Map(),
            channelsIDmembersMap: new Map()
        }
    }
    fetchStandup = async () => {
        const standup_id = this.props.match.params.id;
        let res1 = await executeOperation(
            { standup_id },
            GET_SINGLE_STANDUP
        );
        // res1.data.standup_by_pk.questions.sort((a, b) => a.index - b.index);
        let res2 = await executeOperation(
            { channel: res1.data.standup_by_pk.channel },
            GET_CHANNEL_MEMBERS
        );

        const channels = JSON.parse(localStorage.channels) || [];
        let channelsIDNameMap = new Map();
        channels.forEach(channel => {
            channelsIDNameMap.set(channel.id, channel.name);
        })

        this.setState({ standup: res1.data.standup_by_pk }, () => {
            const channelsIDmembersMap = new Map();
            channelsIDmembersMap.set(res1.data.standup_by_pk.channel, (res2.data && res2.data.getMembers))
            this.setState({ channelsIDmembersMap }, () => {
                this.setState({ channelsIDNameMap });
            })
        })

    }

    setOpenTab = (e) => {
        e.preventDefault();
        console.log(e.target.dataset.toggleId);
        const toggleId = +e.target.dataset.toggleId || 1;
        this.setState({ openTab: toggleId })
    }
    componentDidMount() {
        this.fetchStandup();
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { openTab, standup, channelsIDmembersMap, channelsIDNameMap } = this.state;
        return (
            <>
                <Sidebar />
                {standup ? (
                    <>
                        <div className="shadow-inner px-8 py-6" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                            <div className="max-w-screen-xl mx-auto">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-gray-700 font-medium text-sm">
                                            {`Dashboard / ${standup.name || ''}`}
                                        </span>
                                        <h1 className="pt-4 text-gray-800 font-bold text-4xl">
                                            {standup.name || ''}
                                        </h1>
                                    </div>
                                    <NavLink
                                        to={`/standups/${standup.id}/edit`}
                                        className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl"
                                    >
                                        <HiCog className="inline-block text-xl mb-1 mr-2 cursor-pointer" />
                                        Manage
                                    </NavLink>
                                </div>
                                <div className="p-4 border-lg text-lg bg-white mt-6 shadow-newtype rounded-lg text-gray-600">
                                    <h4 className="pb-4 font-bold text-gray-700">
                                        Schedule
                                    </h4>
                                    {getCronAsString(standup.cron_text) + " in " + standup.timezone + " timezone"}
                                </div>

                                <div className="flex flex-wrap text-lg mt-6 space-x-6">
                                    <div className="flex-auto p-4 bg-white shadow-newtype rounded-lg">
                                        <h4 className="pb-4 font-bold text-gray-700">
                                            Questions
                                        </h4>
                                        {
                                            standup.questions && standup.questions.map(question => (
                                                <p className="mb-2 text-gray-600" key={question.index}><GoPrimitiveDot
                                                    className="inline-block text-xl mb-1 text-teal-500 "
                                                    style={{ color: stc(question.body) }}></GoPrimitiveDot>
                                                    {question.body}
                                                </p>
                                            ))
                                        }

                                    </div>
                                    <div className="flex-auto flex flex-col ">
                                        <div className="p-4 bg-white shadow-newtype mb-6 rounded-lg">
                                            <h4 className="pb-4 font-bold text-gray-700">
                                                Participants
                                            </h4>

                                            <div className="flex overflow-hidden">
                                                {
                                                    channelsIDmembersMap.get(standup.channel) && channelsIDmembersMap
                                                        .get(standup.channel)
                                                        .images
                                                        .filter((image, ind) => ind < 10).map((image, imgI) => (
                                                            <img className={`inline-block h-12 w-12 border-white border-4
                                                             rounded-full text-white shadow-solid ${imgI === 0 ? "" : "-ml-4"}`}
                                                                src={image}
                                                                alt=""
                                                                title={channelsIDmembersMap.get(standup.channel).real_names[imgI]}
                                                                key={imgI} />

                                                        )
                                                        )
                                                }
                                                {
                                                    channelsIDmembersMap.get(standup.channel) && (channelsIDmembersMap.get(standup.channel).images.length > 10) &&
                                                    (
                                                        <div className="-ml-2 flex h-12 w-12 border-white border-4 rounded-full text-white bg-gray-300 shadow-solid items-center justify-center text-lg text-gray-600 font-bold">
                                                            {`+${channelsIDmembersMap.get(standup.channel).images.length - 10}`}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white shadow-newtype rounded-lg">
                                            <h4 className="pb-4 font-bold text-gray-700">
                                                Channels
                                            </h4>
                                            <span className="mt-4 text-gray-600 font-bold text-base border-solid border border-gray-700 rounded-1 px-4 py-1 ">
                                                <span className="text-gray-500 font-extrabold text-xl align-center">#</span> {channelsIDNameMap.get(standup.channel)}
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="px-8 py-6 ">
                            <div className="max-w-screen-xl mx-auto">
                                <div className="flex flex-wrap">
                                    <ul
                                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                        role="tablist"
                                    >
                                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <button
                                                className={
                                                    `text-xl focus:outline-none font-bold  px-5 py-3 leading-normal 
                                                    ${openTab === 1 ? "text-gray-800" : "text-gray-600"}`
                                                }
                                                onClick={
                                                    this.setOpenTab}
                                                data-toggle-id={1}
                                            >
                                                Insights
                                            </button>
                                            {openTab === 1 && (<div className="h-1 w-auto bg-teal-500 -mt-2 rounded mx-4">

                                            </div>)}

                                        </li>
                                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <button
                                                className={
                                                    `text-xl focus:outline-none font-bold px-5 py-3 leading-normal  
                                                    ${openTab === 2 ? "text-gray-800" : "text-gray-600"}`
                                                }
                                                onClick={
                                                    this.setOpenTab}
                                                data-toggle-id={2}
                                            >Timeline
                                            </button>
                                            {openTab === 2 && (<div className="h-1 w-auto bg-teal-500 -mt-2 rounded mx-4">

                                            </div>)}
                                        </li>

                                    </ul>
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="tab-content tab-space">
                                                <div>
                                                    {
                                                        openTab === 1 ? (
                                                            <Insights standup_id={standup.id} />
                                                        ) : (
                                                                <Timeline standup_id={standup.id} />
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>) : (<MainSectionLoader />)
                }
            </>
        )
    }
}
export default withRouter(SingleStandup)

// transition: box-shadow .2s ease,-webkit-box-shadow .2s ease;

//box-shadow: 0 0 8px 0 rgba(0,0,0,.16);
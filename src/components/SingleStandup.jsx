import React from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go"
import stc from 'string-to-color'
import { GET_SINGLE_STANDUP, GET_CHANNEL_MEMBERS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
import Timeline from "./Timeline"
import Insights from "./Insights"
import Sidebar from "./Sidebar";
import GMT from "./GMT";

class SingleStandup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTab: 1,
            standups: [],
            channelsIDNameMap: new Map(),
            channelsIDmembersMap: new Map(),
            data: [{ date: 0, value: 50 }, { date: 0, value: 50 }]
        }
    }
    fetchStandup = async () => {
        const standup_id = this.props.match.params.id;
        // console.log(standupId);
        const creator_slack_id = JSON.parse(localStorage["user-data"]).authed_user.id;
        let res1 = await executeOperation(
            { standup_id },
            GET_SINGLE_STANDUP
        );
        console.log('dsada', res1);
        const channels = JSON.parse(localStorage.channels);
        // let map = new Map();
        // channels.forEach(channel => {
        //     map.set(channel.id, channel.name);
        // })
        // this.setState({ channelsIDNameMap: map, standups: res1.data.standup }, async () => {
        //     const uMap = new Map();
        //     let arr = Array.from(this.state.standups.map(standup => standup.channel));
        //     arr = remove_duplicates(arr);
        //     let requests = arr.map(key => {
        //         return (executeOperation(
        //             { channel: key },
        //             GET_CHANNEL_MEMBERS
        //         ));
        //     });
        //     const results = await Promise.all(requests);
        //     results.forEach((result, index) => {
        //         if (result.data && result.data.getMembers)
        //             uMap.set(arr[index], result.data.getMembers);
        //     })
        //     console.log('dssdds', results);
        //     this.setState({ channelsIDmembersMap: uMap });
        // });
    }

    setOpenTab = (e) => {
        e.preventDefault();
        console.log(e.target.dataset.toggleId);
        const toggleId = +e.target.dataset.toggleId || 1;
        this.setState({ openTab: toggleId })
    }
    componentDidMount() {
        this.fetchStandup();
        // console.log(this.props);
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { openTab, data } = this.state;
        // const { standups, channelsIDNameMap, channelsIDmembersMap } = this.state;
        return (
            <>
                <Sidebar />

                <div className="shadow-inner px-8 py-6" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-700 font-medium text-sm">
                                    Dashboard / Test Slack blocks
                            </span>
                                <h1 className="pt-4 text-gray-800 font-bold text-4xl">
                                    {"Test Slack blocks"}
                                </h1>
                            </div>
                            <NavLink
                                to="/dashboard/create"
                                className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl"
                            >
                                <HiCog className="inline-block text-xl mb-1 mr-2 cursor-pointer" />
                            Manage
                        </NavLink>

                        </div>

                        <div className="p-4 border-lg bg-white mt-6 shadow-newtype rounded-lg">
                            <h4 className="pb-4 font-bold text-gray-800">
                                Schedule
                        </h4>
                        Weekly from Monday to Friday at 14:44 in user's local timezone.
                    </div>

                        <div className="flex flex-wrap mt-6 space-x-6">
                            <div className="flex-auto p-4 bg-white shadow-newtype rounded-lg">
                                <h4 className="pb-4 font-bold text-gray-800">
                                    Questions
                            </h4>
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500" style={{ color: stc("What did you do yesterday?") }}></GoPrimitiveDot> What did you do yesterday?</p>
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 " style={{ color: stc("What are you planning to do today?") }} />What are you planning to do today?</p>
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 " style={{ color: stc("Is there anything blocking your progress?") }} />Is there anything blocking your progress?</p>
                            </div>
                            <div className="flex-auto flex flex-col ">
                                <div className="p-4 bg-white shadow-newtype mb-6 rounded-lg">
                                    <h4 className="pb-4 font-bold text-gray-800">
                                        Participants
                                </h4>

                                    <div class="flex overflow-hidden">
                                        <img className="inline-block h-10 w-10 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="-ml-2 inline-block h-10 w-10 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="-ml-2 inline-block h-10 w-10 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                        <img className="-ml-2 inline-block h-10 w-10 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </div>
                                </div>
                                <div className="p-4 bg-white shadow-newtype rounded-lg">
                                    <h4 className="pb-4 font-bold text-gray-800">
                                        Channels
                                </h4>
                                    <span className="mt-4 text-gray-700 font-bold text-base border-solid border-2 border-gray-700 rounded-lg px-4 py-1 ">
                                        <span className="text-gray-500 font-extrabold text-xl align-center">#</span> bot-test
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
                                            "text-xl focus:outline-none font-bold  px-5 py-3 leading-normal "
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
                                            "text-xl focus:outline-none font-bold  px-5 py-3 leading-normal "
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
                                                    <Insights />
                                                ) : (
                                                        <Timeline />
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
export default withRouter(SingleStandup)

// transition: box-shadow .2s ease,-webkit-box-shadow .2s ease;

//box-shadow: 0 0 8px 0 rgba(0,0,0,.16);
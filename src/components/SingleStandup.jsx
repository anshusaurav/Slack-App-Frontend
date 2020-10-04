import React from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { GET_CHANNEL_MEMBERS, GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
import PieChart from "./PieChart"


class SingleStandup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTab: 1,
            standups: [],
            channelsIDNameMap: new Map(),
            channelsIDmembersMap: new Map(),
            data: [{ date: 0, value: 10 }, { date: 0, value: 90 }]
        }
    }
    fetchStandups = async () => {
        const standupId = this.props.match.params.id;
        console.log(standupId);
        const creator_slack_id = JSON.parse(localStorage["user-data"]).authed_user.id;
        let res1 = await executeOperation(
            { creator_slack_id },
            GET_STANDUPS
        );
        // this.setState({ standups: res1.data.standup });
        const channels = JSON.parse(localStorage.channels);
        // console.log(res1, channels);
        let map = new Map();
        channels.forEach(channel => {
            map.set(channel.id, channel.name);
        })
        this.setState({ channelsIDNameMap: map, standups: res1.data.standup }, async () => {
            const uMap = new Map();
            let arr = Array.from(this.state.standups.map(standup => standup.channel));
            arr = remove_duplicates(arr);
            let requests = arr.map(key => {
                return (executeOperation(
                    { channel: key },
                    GET_CHANNEL_MEMBERS
                ));
            });
            const results = await Promise.all(requests);
            results.forEach((result, index) => {
                if (result.data && result.data.getMembers)
                    uMap.set(arr[index], result.data.getMembers);
            })
            console.log('dssdds', results);
            this.setState({ channelsIDmembersMap: uMap });
        });
    }

    setOpenTab = (e) => {
        e.preventDefault();
        console.log(e.target.dataset.toggleId);
        const toggleId = +e.target.dataset.toggleId || 1;
        this.setState({ openTab: toggleId })
    }
    componentDidMount() {
        this.fetchStandups();
        console.log(this.props);
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { openTab, data } = this.state;
        // const { standups, channelsIDNameMap, channelsIDmembersMap } = this.state;
        return (
            <>
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
                                <HiCog className="inline-block text-xl mb-1 text-teal-500 hover:bg-teal-500 cursor-pointer" />
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
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 " />What did you do yesterday?</p>
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 " />What are you planning to do today?</p>
                                <p className="mb-2"><GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 " />Is there anything blocking your progress?</p>
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
                                                    <div className="bg-white">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <button className="w-12 h-12 focus:outline-none  shadow-newtype rounded-full flex items-center justify-center">
                                                                        <HiArrowLeft className="inline-block text-xl text-bold m-1 text-gray-500 cursor-pointer" />
                                                                    </button>
                                                                </div>
                                                                <div className="mx-6  font-bold">
                                                                    Thursday, Oct 1st
                                                                </div>
                                                                <div>
                                                                    <button className="w-12 h-12 focus:outline-none  shadow-newtype rounded-full flex items-center justify-center">
                                                                        <HiArrowRight className="inline-block text-xl text-bold m-1 text-gray-500 cursor-pointer" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap space-x-3 mt-4">
                                                            <div className="flex-auto p-4 px-3">
                                                                <div className="border-solid border border-gray-400 rounded-lg">
                                                                    <div className="">
                                                                        <div className="border-b border-gray-300 p-6">
                                                                            <p className="font-bold text-xl tracking-wide">
                                                                                <GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 mr-2" />
                                                                                What did you do yesterday?
                                                                            </p>
                                                                        </div>
                                                                        <div className="pr-10 pl-4">
                                                                            <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                                                                <div className="flex py-4">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex py-4 border-t">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2 ">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex py-4 border-t">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2 ">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="border-t flex justify-end p-6 text-gray-600 text-lg tracking-wide">
                                                                            3 total responses
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="border-solid border border-gray-400 rounded-lg mt-2">
                                                                    <div className="">
                                                                        <div className="border-b border-gray-300 p-6">
                                                                            <p className="font-bold text-xl tracking-wide">
                                                                                <GoPrimitiveDot className="inline-block text-xl mb-1 text-teal-500 mr-2" />
                                                                                What are you planning to do today?
                                                                            </p>
                                                                        </div>
                                                                        <div className="pr-10 pl-4">
                                                                            <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                                                                <div className="flex py-4">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex py-4 border-t">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2 ">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex py-4 border-t">
                                                                                    <div className="flex flex-2">
                                                                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                                                    </div>
                                                                                    <div className="w-full ml-2 ">
                                                                                        <h4 className="leading-6 font-bold text-lg tracking-wide">Mark Taylor</h4>
                                                                                        <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="border-t flex justify-end p-6 text-gray-600 text-lg tracking-wide">
                                                                            3 total responses
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                                ) : (
                                                        <p>
                                                            Completely synergize resource taxing relationships via
                                                            premier niche markets. Professionally cultivate one-to-one
                                                            customer service with robust ideas.
                                                            <br />
                                                            <br />
                                                            Dynamically innovate resource-leveling customer service for
                                                            state of the art customer service.
                                                        </p>
                                                    )
                                            }
                                        </div>
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >

                </div >
            </>
        )
    }
}
export default withRouter(SingleStandup)

// transition: box-shadow .2s ease,-webkit-box-shadow .2s ease;

//box-shadow: 0 0 8px 0 rgba(0,0,0,.16);
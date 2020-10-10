import React from "react";
import { Link, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go"
import stc from 'string-to-color'
import { GET_SINGLE_STANDUP } from "../graphql/queries"
import { executeOperation, getCronAsString } from "../graphql/helpers"
import { MainSectionLoader } from "../components/LoaderPage"
import Timeline from "../components/Timeline"
import Insights from "../components/Insights"
import Sidebar from "../components/Sidebar";

class SingleStandup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            openTab: 1,
            standup: null,
            channelsIDmembersMap: new Map(),
            channelsMap: null,
            membersMap: null,
        }
    }
    fetchStandup = async () => {
        const standup_id = this.props.match.params.id;
        const { channels, members, channelMembers } = this.props;
        let res1 = await executeOperation(
            { standup_id },
            GET_SINGLE_STANDUP
        );
        const standup = res1.data.standup_by_pk;

        let channelsMap = new Map();
        channels.forEach(channel => {
            channelsMap.set(channel.id, channel);
        })
        let membersMap = new Map();
        members.forEach(member => {
            membersMap.set(member.id, member);
        })
        let channelsIDmembersMap = new Map();
        channelMembers.forEach(channel => {
            channelsIDmembersMap.set(channel.id, channel.members
                .filter((member, index) => !membersMap.get(member).is_bot)
                .map(member => membersMap.get(member)));
        })
        this.setState({
            standup, channelsMap, membersMap, channelsIDmembersMap
        });

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
        const { openTab, standup, channelsIDmembersMap, channelsMap, membersMap } = this.state;
        const { toggleLoggedIn, slackUser, userProfile, channels, members, channelMembers } = this.props;
        return (
            <div className="flex flex-wrap">

                <Sidebar toggleLoggedIn={toggleLoggedIn}
                    slackUser={slackUser}
                    userProfile={userProfile} />
                {standup ? (
                    <div className="flex-grow ml-24">
                        <div className="shadow-inner px-8 py-6" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                            <div className="max-w-screen-xl mx-auto">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-gray-700 font-medium text-sm">
                                            <Link to="/dashboard">Dashboard</Link> /
                                            {' ' + standup.name || ''}
                                        </span>
                                        <h1 className="pt-4 text-gray-800 font-bold text-lg md:text-4xl">
                                            {standup.name || ''}
                                        </h1>
                                    </div>
                                    <Link
                                        to={`/standups/${standup.id}/edit`}
                                        className="border-2 px-6 md:px-12 py-2 rounded-full border-blue-500 font-medium hover:bg-blue-500 text-blue-500  hover:text-white hover:shadow-xl"
                                    >
                                        <HiCog className="inline-block text-lg md:text-xl mb-1 mr-1 cursor-pointer" />
                                        Manage
                                    </Link>
                                </div>
                                <div className="p-4 border-lg text-lg bg-white mt-6 shadow-newtype rounded-lg text-gray-600">
                                    <h4 className="pb-4 font-bold text-gray-700">
                                        Schedule
                                    </h4>
                                    {getCronAsString(standup.cron_text) + " in " + standup.timezone + " timezone"}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 text-lg mt-4 md:mt-6 gap-4">
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
                                                    channelsIDmembersMap.get(standup.channel).filter((member, ind) => ind < 8)
                                                        .map((member, imgI) => {
                                                            return (

                                                                <img className={"inline-block h-12 w-12 border-white border-4 rounded-full text-white shadow-solid "
                                                                    + (imgI === 0 ? "" : "-ml-4")}
                                                                    src={member.profile.image_72}
                                                                    alt={member.profile.real_name}
                                                                    title={member.profile.real_name}
                                                                    key={imgI}
                                                                />

                                                            )
                                                        })
                                                }
                                                {
                                                    channelsIDmembersMap.get(standup.channel) &&
                                                    (channelsIDmembersMap.get(standup.channel).map(e => e).length > 8) &&
                                                    (
                                                        <div className="-ml-4 flex h-12 w-12 border-white border-4 
                              rounded-full text-grey bg-gray-300 shadow-solid items-center 
                              justify-center text-lg text-gray-600 font-bold">
                                                            {`+${channelsIDmembersMap.get(standup.channel).map(e => e).length - 8}`}
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
                                                <span className="text-gray-500 font-extrabold text-xl align-center">#
                                                </span> {channelsMap.get(standup.channel).name}
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
                                            {openTab === 1 && (<div className="h-1 w-auto bg-blue-500 -mt-2 rounded mx-4">

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
                                            {openTab === 2 && (<div className="h-1 w-auto bg-blue-500 -mt-2 rounded mx-4">

                                            </div>)}
                                        </li>

                                    </ul>
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="tab-content tab-space">
                                                <div>
                                                    {
                                                        openTab === 1 ? (
                                                            <Insights standup_id={standup.id}
                                                                slackUser={slackUser}
                                                                userProfile={userProfile}
                                                                channels={channels}
                                                                members={members}
                                                                channelMembers={channelMembers}
                                                                channelsMap={channelsMap}
                                                                membersMap={membersMap}
                                                                channelsIDmembersMap={channelsIDmembersMap}
                                                            />
                                                        ) : (
                                                                <Timeline standup_id={standup.id}
                                                                    slackUser={slackUser}
                                                                    userProfile={userProfile}
                                                                    channels={channels}
                                                                    members={members}
                                                                    channelMembers={channelMembers}
                                                                    channelsMap={channelsMap}
                                                                    membersMap={membersMap}
                                                                    channelsIDmembersMap={channelsIDmembersMap}
                                                                />
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>)
                    : (<MainSectionLoader />)
                }
            </div>
        )
    }
}
export default withRouter(SingleStandup)

// transition: box-shadow .2s ease,-webkit-box-shadow .2s ease;

//box-shadow: 0 0 8px 0 rgba(0,0,0,.16);
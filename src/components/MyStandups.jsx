import React from "react";
import { Link } from 'react-router-dom'
import { GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import Sidebar from "./Sidebar"
import { AllStandupsLoader } from "./LoaderPage"
import { RiAddLine } from "react-icons/ri"
import MiniCalendar from "./MiniCalendar";
class MyStandups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standups: null,
      channelsIDmembersMap: null,
      channelsMap: null,
      membersMap: null,

    }
  }
  fetchStandups = async () => {
    console.log(this.props);
    const { slackUser, channels, members, channelMembers } = this.props;
    const creator_slack_id = slackUser.id;
    let res1 = await executeOperation(
      { creator_slack_id },
      GET_STANDUPS
    );
    console.log(res1);
    // console.log(localStorage)
    const standups = res1.data.standup;
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
      standups, channelsMap, membersMap, channelsIDmembersMap
    });
  }

  componentDidMount() {
    this.fetchStandups();
  }


  render() {
    const { standups, channelsMap, channelsIDmembersMap } = this.state;
    const { toggleLoggedIn, slackUser, userProfile } = this.props;
    // console.log('Render: ', this.state);
    return (
      <>
        <Sidebar toggleLoggedIn={toggleLoggedIn}
          slackUser={slackUser}
          userProfile={userProfile} />
        <div className="shadow-inner py-6"
          style={{ backgroundColor: "rgb(250, 250, 250)" }}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center px-8 pb-8">
              <div>
                <span className="text-gray-700 font-medium text-sm">
                  Dashboard / Home
                </span>
                <h1 className="pt-4 text-gray-800 font-bold text-4xl">
                  {"My Standups"}
                </h1>
              </div>
              <Link to="/dashboard/create"
                className="border-2 px-12 py-2 rounded-full 
                border-teal-500 font-medium hover:bg-teal-500 text-teal-500  
                hover:text-white hover:shadow-xl">
                <RiAddLine className="inline-block text-xl mb-1 
                mr-2 cursor-pointer" />
                  New Standup
              </Link>
            </div>
            <div className="mt-12" v-for="item in itemList">
              {standups && standups.length !== 0 && (
                standups.map((standup, index) => (
                  <Link className="w-full" to={"/standups/" + standup.id} key={index}>

                    <div className="mx-8 p-8 mb-4 border round-lg bg-white 
                    hover:shadow-newtype flex flex-no-wrap justify-between 
                    items-center">
                      <div className="w-7/12 pr-2">
                        <div className="flex flex-wrap items-end leading-8">
                          <h4 className="pt-4 text-4xl text-gray-700 font-bold">
                            {standup.name}
                          </h4>
                          {
                            standup.paused && (
                              <div className="ml-4">
                                <span className="bg-orange-500 text-sm text-white font-bold px-1 py-2 rounded-lg">PAUSED</span>
                              </div>
                            )
                          }

                        </div>
                        <h4 className="pt-4 text-1xl text-gray-500 text-1xl">
                          {getCronAsString(standup.cron_text) + " in " +
                            standup.timezone + " timezone"}
                        </h4>

                        <div className="flex overflow-hidden mt-4 mb-8" >

                          {
                            channelsIDmembersMap.get(standup.channel).filter((member, ind) => ind < 8)
                              .map((member, imgI) => {
                                return (

                                  <img className={"inline-block h-20 w-20 border-white border-4 rounded-full text-white shadow-solid "
                                    + (imgI === 0 ? "" : "-ml-4")}
                                    src={member.profile.image_72}
                                    alt=""
                                    title={member.profile.real_name} />

                                )
                              })
                          }
                          {
                            channelsIDmembersMap.get(standup.channel) &&
                            (channelsIDmembersMap.get(standup.channel).map(e => e).length > 8) &&
                            (
                              <div className="-ml-4 flex h-20 w-20 border-white border-4 
                              rounded-full text-grey bg-gray-300 shadow-solid items-center 
                              justify-center text-lg text-gray-600 font-bold">
                                {`+${channelsIDmembersMap.get(standup.channel).map(e => e).length - 8}`}
                              </div>
                            )
                          }

                        </div>
                        <span className="mt-4 text-gray-700 font-bold text-base 
                        border-solid border border-gray-400 rounded-1 px-4 py-2">
                          {channelsMap.get(standup.channel).name}
                        </span>
                      </div>
                      <div className="w-5/12">
                        <MiniCalendar cron_text={standup.cron_text} />
                      </div>
                    </div>
                  </Link>
                )
                ))
              }
              {
                standups && standups.length === 0 && (<></>)
              }
              {

                !standups && (
                  <div className="w-full">
                    <AllStandupsLoader />
                  </div>)
              }

            </div>
          </div>
        </div>
      </>
    )
  }
}
export default MyStandups;
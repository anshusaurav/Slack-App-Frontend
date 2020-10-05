import React from "react";
import { Link } from 'react-router-dom'
import HeaderMyStandups from "../components/HeaderMyStandups";
import { GET_CHANNEL_MEMBERS, GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
import Sidebar from "./Sidebar"
import { MainSectionLoader, AllStandupsLoader } from "./LoaderPage"
import { NavLink, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go"
import stc from 'string-to-color'

import GMT from "./GMT";
import MiniCalendar from "./MiniCalendar";
class MyStandups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standups: [],
      channelsIDNameMap: new Map(),
      channelsIDmembersMap: new Map(),
    }
  }
  fetchStandups = async () => {
    const creator_slack_id = this.props.slackUser.authed_user.id;
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

  componentDidMount() {
    this.fetchStandups();
    console.log(this.props);
  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { standups, channelsIDNameMap, channelsIDmembersMap } = this.state;
    return (
      <>
        <Sidebar />
        <div className="shadow-inner py-6" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
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
                className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl"
              >
                <HiCog className="inline-block text-xl mb-1 mr-2 cursor-pointer" />
                            New Standup
              </Link>

            </div>


            <div className="mt-12" v-for="item in itemList">
              {standups.length !== 0 ? (

                standups.map((standup, index) => (
                  <Link className="w-full" to={"/standups/" + standup.id}>

                    <div className="mx-8 p-8 mb-4 border round-lg bg-white hover:shadow-newtype flex justify-between items-center">
                      <div className="w-7/12 pr-2">

                        <h4 className="pt-4 text-4xl text-gray-700 font-bold">
                          {standup.name}
                        </h4>
                        <h4 className="pt-4 text-1xl text-gray-500 text-1xl">
                          {getCronAsString(standup.cron_text) + " in " + standup.timezone + " timezone"}
                        </h4>
                        <div className="flex overflow-hidden mt-4 mb-8" >
                          {
                            channelsIDmembersMap.get(standup.channel) && channelsIDmembersMap.get(standup.channel).images.filter((image, ind) => ind < 10).map((image, imgI) => {
                              return (

                                <img className={"inline-block h-20 w-20 border-white border-4 rounded-full text-white shadow-solid " + (imgI === 0 ? "" : "-ml-4")}
                                  src={image}
                                  alt=""
                                  title={channelsIDmembersMap.get(standup.channel).real_names[imgI]} />

                              )
                            })
                          }
                          {
                            channelsIDmembersMap.get(standup.channel) && (channelsIDmembersMap.get(standup.channel).images.length > 10) &&
                            (
                              <div className="-ml-4 flex h-20 w-20 border-white border-4 rounded-full text-grey bg-gray-300 shadow-solid items-center justify-center text-lg text-gray-600 font-bold">
                                {`+${channelsIDmembersMap.get(standup.channel).images.length - 10}`}
                              </div>
                            )
                          }
                        </div>
                        <span className="mt-4 text-gray-700 font-bold text-base border-solid border border-gray-400 rounded-1 px-4 py-2">
                          {channelsIDNameMap.get(standup.channel)}
                        </span>
                      </div>
                      <div className="w-5/12">
                        <MiniCalendar cron_text={standup.cron_text} />
                      </div>
                    </div>
                  </Link>
                ))) : (<div className="w-full"><AllStandupsLoader /></div>)
              }
            </div>



          </div>
        </div>
      </>
    )
  }
}
export default MyStandups;
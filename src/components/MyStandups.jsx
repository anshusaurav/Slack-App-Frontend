import React from "react";
import { Link } from 'react-router-dom'
import HeaderMyStandups from "../components/HeaderMyStandups";
import { GET_CHANNEL_MEMBERS, GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
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
        <HeaderMyStandups title="My standups" userProfileInfo={this.props.userProfileInfo} />




        <div v-for="row in rows">
          {
            standups.length && standups.map((standup, index) => (
              <Link to={"/standups/" + standup.id}>
                <div className="py-8 odd:bg-white even:bg-gray-600" key={index}>
                  <div className="max-w-screen-xl mx-auto p-8 hover:bg-white hover:shadow-lg flex justify-between items-center">
                    <div className="w-9/12">

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


                      <span className="mt-4 text-gray-700 font-bold text-base border-solid border-2 border-gray-700 rounded-lg pl-4 pr-4">
                        {channelsIDNameMap.get(standup.channel)}
                      </span>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </Link >
            ))

          }
        </div>
      </>
    )
  }
}
export default MyStandups;



// export default function MyStandups(props) {
//   return (
//     <>
//       <HeaderMyStandups userProfileInfo={props.userProfileInfo} />
//       <Standups slackUser={props.slackUser} />
//     </>
//   );
// }

// function Standups(props) {
//   let data = [];
//   return data.map((standup) => (
//     <div className="py-8 border-2" key={uuid()}>
//       <div className="max-w-screen-xl mx-auto p-8 hover:bg-white hover:shadow-lg flex justify-between items-center">
//         <div className="w-9/12">
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Standup Id: {standup.id}
//           </h4>
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Standup Name: {standup.name}
//           </h4>
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Message: {standup.message}
//           </h4>
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Channel: {standup.channel}
//           </h4>
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Creatar Slack Id: {standup.creator_slack_id}
//           </h4>
//           <h4 className="pt-4 text-gray-700 font-bold text-1xl">
//             Cron Text: {standup.cron_text}
//           </h4>
//         </div>
//         <div>
//           <button
//             className="bg-blue-800 text-white rounded-full py-1 px-3 hover:bg-blue-700"
//           >
//             Delete
//           </button>
//           <button className="bg-blue-800 text-white rounded-full py-1 px-3 hover:bg-blue-700">
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   ));
// }

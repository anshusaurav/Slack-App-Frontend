import React from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { HiCog } from "react-icons/hi";
import { GET_CHANNEL_MEMBERS, GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, getCronAsString } from "./../graphql/helpers"
import { remove_duplicates } from "./../slack/helpers"
class SingleStandup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standups: [],
            channelsIDNameMap: new Map(),
            channelsIDmembersMap: new Map(),
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

    componentDidMount() {
        this.fetchStandups();
        console.log(this.props);
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {

        // const { standups, channelsIDNameMap, channelsIDmembersMap } = this.state;
        return (
            <div className="shadow-inner px-8 py-4" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
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
                            className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white"
                        >
                            <HiCog className="inline-block text-xl mb-1 text-teal-500 hover:bg-teal-500 cursor-pointer" />
                            Manage
                        </NavLink>

                    </div>

                    <div class="box-outline p-4 border-lg hover:bg-white hover:shadow-lg mt-6" style={{ boxShadow: "0 0 8px 0 rgba(0,0,0,.16)" }}>
                        <h4 className="pb-4 font-bold text-gray-800">
                            Schedule
                        </h4>
                        Weekly from Monday to Friday at 14:44 in user's local timezone.
                    </div>

                    <div className="flex flex-wrap mt-6">
                        <div className="w-3/5 flex-none py-2">
                            <h4 className="pb-4 font-bold text-gray-800">
                                Questions
                            </h4>
                            <p>Weekly from Monday to Friday at 14:44 in user's local timezone.</p>
                        </div>
                        <div className="w-2/5 flex-none py-2">
                            <div class="text-gray-700 text-center bg-gray-400 p-2">2</div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(SingleStandup)

// transition: box-shadow .2s ease,-webkit-box-shadow .2s ease;

//box-shadow: 0 0 8px 0 rgba(0,0,0,.16);
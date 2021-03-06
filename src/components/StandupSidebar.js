import React from "react";
import { Link } from "react-router-dom";
import { GET_STANDUPS } from "./../graphql/queries"
import { executeOperation, } from "./../graphql/helpers"


class StandupSidebar extends React.Component {
    state = { standups: null };

    fetchStandups = async () => {
        const { slackUser } = this.props;
        const creator_slack_id = slackUser.id;
        let res1 = await executeOperation(
            { creator_slack_id },
            GET_STANDUPS
        );
        const standups = res1.data.standup;
        this.setState({ standups });
    }

    componentDidMount() {
        this.fetchStandups();

    }
    render() {
        const { standups } = this.state;
        return (

            <div className="md:flex-col md:items-stretch md:min-h-full 
            md:flex-no-wrap px-0 flex flex-wrap items-center 
            justify-between w-full mx-auto">
                <div className="px-8 py-6 h-full">
                    <div className="pr-6 h-full overflow-hidden">
                        <div className="p-0 m-0">
                            <Link to="/dashboard" className="text-xl font-bold 
                            text-gray-700">
                                Standups
                            </Link>
                        </div>
                        <div className="p-0 mt-6">
                            <Link to="/dashboard/create"
                                className="mt-4 text-gray-600 font-bold text-base 
                            border-solid border border-gray-400 rounded-1 px-2 
                            py-2">New Standup</Link>
                        </div>
                        {
                            standups && standups.map((standup, index) => (
                                <div className="mt-4 truncate" key={index}>
                                    <Link to={`/standups/${standup.id}`}
                                        className="text-lg text-gray-600 
                                        cursor-pointer ">
                                        {standup.name}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


        )
    }
}
export default StandupSidebar

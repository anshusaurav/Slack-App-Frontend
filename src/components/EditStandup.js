import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { GET_SINGLE_STANDUP, PAUSE_STANDUP, UNPAUSE_STANDUP } from "./../graphql/queries"
import { executeOperation, getCronAsCronTime, getCronAsCronDays } from "./../graphql/helpers"
import Sidebar from "./Sidebar"
import { withRouter } from "react-router-dom";
import { MainSectionLoader } from "./LoaderPage"

class EditStandup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            standup: null,
            isLoading: false,
            isUpdated: false,
        }
    }

    fetchStandup = async () => {
        const standup_id = this.props.match.params.id;
        let res1 = await executeOperation(
            { standup_id },
            GET_SINGLE_STANDUP
        );
        const standup = res1.data.standup_by_pk;
        this.setState({
            standup
        })

    }
    pauseStandup = async (event) => {
        event.preventDefault();
        const standup_id = this.props.match.params.id;
        let res1 = await executeOperation(
            { standup_id },
            PAUSE_STANDUP
        );
        console.log(res1);
        this.setState({ isUpdated: !this.state.isUpdated })
    }

    unpauseStandup = async (event) => {
        event.preventDefault();
        const standup_id = this.props.match.params.id;
        let res1 = await executeOperation(
            { standup_id },
            UNPAUSE_STANDUP
        );
        console.log(res1);
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    componentDidMount() {
        // this.init();
        this.fetchStandup();
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.isUpdated !== prevState.isUpdated) {
            // this.init();
            this.fetchStandup();
        }
    }
    render() {
        const { standup, paused } = this.state;
        return (
            <>
                <Sidebar />

                {
                    standup ? (<>
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

                                </div>
                            </div>
                        </div>
                        <section className="px-8 py-6 max-w-screen-xl mx-auto mt-10 border border-lg my-4">
                            <div className="flex flex-initial flex-wrap flex-row">
                                <div className="max-w-1/2 px-2 flex-3">
                                    {
                                        standup.paused ? (
                                            <div>
                                                <h3 className="mb-2 font-bold text-xl text-gray-700">Resume this report</h3>
                                                <p className="mb-6">Pausing the report with stop Pupbot from sending DM's to participants. All data will be retained</p>
                                                <button onClick={this.unpauseStandup} className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl">Resume</button>
                                            </div>
                                        ) : (
                                                <div>
                                                    <h3 className="mb-2 font-bold text-xl text-gray-700">Pause this report</h3>
                                                    <p className="mb-6">Pausing the report with stop Pupbot from sending DM's to participants. All data will be retained</p>
                                                    <button onClick={this.pauseStandup} className="border-2 px-12 py-2 rounded-full border-orange-500 font-medium hover:bg-orange-500 text-orange-500  hover:text-white hover:shadow-xl">Pause</button>
                                                </div>
                                            )
                                    }

                                </div>
                                <div className="max-w-1/2 px-2 flex-3">
                                    <div>
                                        <h3 className="mb-2 font-bold text-xl text-gray-700">Delete this report</h3>
                                        <p className="mb-12">Deleting a report is permanent and non reversible. All data will be erased!</p>
                                        <button className="border-2 px-12 py-2 rounded-full border-red-500 font-medium hover:bg-red-500 text-red-500  hover:text-white hover:shadow-xl">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>) : (<MainSectionLoader />)
                }

            </>
        );
    }
}

export default withRouter(EditStandup)
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { withRouter, Link } from "react-router-dom";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi"
import { RiDeleteBin4Line } from "react-icons/ri"
import { GET_SINGLE_STANDUP, PAUSE_STANDUP, UNPAUSE_STANDUP, DELETE_STANDUP } from "./../graphql/queries"
import { executeOperation } from "./../graphql/helpers"
import Sidebar from "../components/Sidebar"

import { MainSectionLoader } from "../components/LoaderPage"

class EditStandup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            standup: null,
            isLoading: false,
            isUpdated: false,
            isDeleteing: false,
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
    pauseStandup = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true }, async () => {
            const standup_id = this.props.match.params.id;
            let res1 = await executeOperation(
                { standup_id },
                PAUSE_STANDUP
            );
            // console.log('Pausing', res1)
            if (res1.errors)
                return;
            this.setState({ isUpdated: !this.state.isUpdated, isLoading: false })
        })

    }

    unpauseStandup = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true }, async () => {
            const standup_id = this.props.match.params.id;
            let res1 = await executeOperation(
                { standup_id },
                UNPAUSE_STANDUP
            );

            // console.log('Unpausing', res1)
            if (res1.errors)
                return;
            this.setState({ isUpdated: !this.state.isUpdated, isLoading: false })
        })

    }
    deleteStandup = async (event) => {
        event.preventDefault();
        this.setState({ isDeleting: true }, async () => {
            const standup_id = this.props.match.params.id;
            let res1 = await executeOperation(
                { standup_id },
                DELETE_STANDUP
            );

            console.log('Dleting', res1)
            if (res1.errors)
                return;
            // console.log(res1)
            this.setState({ isUpdated: !this.state.isUpdated, isDeleting: false })
            this.props.history.push('/dashboard')
        })
    }
    componentDidMount() {
        this.fetchStandup();
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.isUpdated !== prevState.isUpdated) {
            this.fetchStandup();
        }
    }
    render() {
        const { standup, isLoading, isDeleting } = this.state;
        const { toggleLoggedIn, slackUser, userProfile } = this.props;

        return (
            <div className="flex flex-wrap">
                <Sidebar toggleLoggedIn={toggleLoggedIn}
                    slackUser={slackUser}
                    userProfile={userProfile} />

                {
                    standup ? (
                        <div className="flex-grow ml-24">
                            <div className="shadow-inner px-8 py-6"
                                style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                                <div className="max-w-screen-xl mx-auto">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-gray-700 font-medium text-sm">
                                                <span className="text-gray-700 font-medium text-sm">
                                                    <Link to="/dashboard">Dashboard</Link>/
                                                <Link to={`/standups/${standup.id}`}>{standup.name || ''}</Link>/Edit

                                            </span>
                                            </span>
                                            <h1 className="pt-4 text-gray-800 font-bold text-2xl md:text-4xl">
                                                {standup.name || ''}
                                            </h1>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <section className="px-8 py-6 max-w-screen-xl mx-auto 
                            mt-10 border border-lg my-4">
                                <div className="flex flex-initial flex-wrap flex-row">
                                    <div className="max-w-full md:max-w-1/2 px-4">
                                        {
                                            standup.paused ? (
                                                <div>
                                                    <h3 className="mb-2 font-bold text-xl text-gray-700">
                                                        Resume this report
                                                    </h3>
                                                    <p className="mb-6">
                                                        Pausing the report with stop Pupbot from sending DM's to participants.
                                                        All data will be retained
                                                </p>
                                                    <button onClick={this.unpauseStandup}
                                                        className=" box-border border-2 px-12 py-4 rounded-full border-teal-500 font-medium 
                                                    hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl flex items-center focus:outline-none"
                                                        disabled={isLoading}>
                                                        {
                                                            isLoading ? (<Loader type="Watch"
                                                                height={20} width={20}
                                                                color="#2f855a"
                                                                style={{ display: "inline-block", marginRight: 8 }} />) :
                                                                (<HiOutlinePlay className="inline-block text-xl text-bold h-5 w-5
                                                                mr-1  cursor-pointer" />)
                                                        }
                                                    Resume

                                                </button>
                                                </div>
                                            ) : (
                                                    <div>
                                                        <h3 className="mb-2 font-bold text-xl text-gray-700">
                                                            Pause this report
                                                    </h3>
                                                        <p className="mb-6">
                                                            Pausing the report with stop Pupbot from sending DM's to participants. All data will be retained
                                                    </p>
                                                        <button onClick={this.pauseStandup}
                                                            className=" box-border border-2 px-12 py-4 rounded-full border-orange-500 
                                                        font-medium hover:bg-orange-500 text-orange-500  hover:text-white hover:shadow-xl flex items-center focus:outline-none"
                                                            disabled={isLoading}>
                                                            {
                                                                isLoading ? (<Loader type="Watch"
                                                                    height={20} width={20}
                                                                    color="#c05621"
                                                                    style={{ display: "inline-block", marginRight: 8 }} />) :
                                                                    (<HiOutlinePause className="inline-block text-xl text-bold h-5 w-5
                                                                mr-1 cursor-pointer" />)
                                                            }
                                                        Pause
                                                    </button>
                                                    </div>
                                                )
                                        }

                                    </div>
                                    <div className="max-w-full md:max-w-1/2 px-4 mt-8 md:mt-0">
                                        <div>
                                            <h3 className="mb-2 font-bold text-xl text-gray-700">
                                                Delete this report
                                        </h3>
                                            <p className="mb-12">
                                                Deleting a report is permanent and non reversible. All data will be erased!
                                        </p>
                                            <button onClick={this.deleteStandup}
                                                className="border-2 px-12 py-4 rounded-full border-red-500 font-medium 
                                            hover:bg-red-500 text-red-500  hover:text-white hover:shadow-xl focus:outline-none flex items-center"
                                                disabled={isDeleting}>
                                                {isDeleting ? (<Loader type="Watch"
                                                    height={20} width={20}
                                                    color="#c05621"
                                                    style={{ display: "inline-block", marginRight: 8 }} />) :
                                                    (<RiDeleteBin4Line className="inline-block text-xl text-bold h-5 w-5
                                                                mr-1 cursor-pointer" />)
                                                }
                                            Delete
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>) : (<MainSectionLoader />)
                }

            </div>
        );
    }
}

export default withRouter(EditStandup)
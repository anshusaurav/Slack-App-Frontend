import React, { Component } from 'react'
import { GoPrimitiveDot } from "react-icons/go"
import NiceDatePicker from "./DatePicker"
import { GET_STANDUP_RESPONSES, GET_CHANNEL_MEMBERS } from "./../graphql/queries"
import { executeOperation } from "./../graphql/helpers"

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberProfileMap: new Map(),
            standupRuns: null,
            questions: null,
            currentStandupIndex: 0,

        }
    }
    fetchStandupRuns = async () => {
        const { standup_id } = this.props;
        // console.log('dasd', standup_id)
        let res1 = await executeOperation(
            { standup_id },
            GET_STANDUP_RESPONSES
        );
        console.log(res1);
        let res2 = await executeOperation(
            { channel: res1.data.standup_by_pk.channel },
            GET_CHANNEL_MEMBERS
        );
        console.log(res2)
        // console.log(res2.data.getMembers);
        this.setState({
            standupRuns: res1.data.standup_by_pk.standup_runs.map(standup_run => {
                return {
                    id: standup_run.id, created_at: standup_run.created_at,
                    responses: standup_run.responses
                }
            }),
            questions: res1.data.standup_by_pk.questions
        }, () => {
            let memberProfileMap = new Map();
            // console.log(res2);
            const { ids, images, real_names } = res2.data.getMembers;

            ids.forEach((id, index) => {
                memberProfileMap.set(id, {
                    id, image: images[index],
                    real_name: real_names[index]
                })
            })
            this.setState({ memberProfileMap })
        });
    }
    componentDidMount() {
        this.fetchStandupRuns();
    }
    render() {
        return (
            <div className="bg-white animate-fadesunnyin">

                <div className="flex flex-wrap space-x-3 mt-4">
                    <div className="flex-auto p-4 px-3">
                        <div className="rounded-lg">
                            <div className="relative m-0 p-0 clear-both text-center leading-4 text-base font-bold">
                                <div className="absolute border-solid border-t border-gray-500 top-8 right-0 left-0 m-0">
                                </div>
                                <div className="bg-white inline-block relative px-4 py-1 mx-auto my-0">
                                    Wednesday, September 30th
                            </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex py-4 items-center">
                                    <div className="flex flex-2">
                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                    </div>
                                    <div className="w-full ml-2">
                                        <span className="leading-6 font-bold text-xl tracking-wide">Mark Taylor</span>
                                        <span className="inline-block text-lg tracking-wide mx-2">  11:53 PM </span>
                                    </div>
                                </div>
                                <div className="pr-10 pl-12">
                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What did you accomplish yesterday</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What are you planning to do today?</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">Is there anything blocking your progress</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-2">
                                <div className="flex py-4 items-center">
                                    <div className="flex flex-2">
                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                    </div>
                                    <div className="w-full ml-2">
                                        <span className="leading-6 font-bold text-xl tracking-wide">Mark Taylor</span>
                                        <span className="inline-block text-lg tracking-wide mx-2">  11:53 PM </span>
                                    </div>
                                </div>
                                <div className="pr-10 pl-12">
                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What did you accomplish yesterday</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What are you planning to do today?</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">Is there anything blocking your progress</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="rounded-lg">
                            <div className="relative m-0 p-0 clear-both text-center leading-4 text-base font-bold">
                                <div className="absolute border-solid border-t border-gray-500 top-8 right-0 left-0 m-0">
                                </div>
                                <div className="bg-white inline-block relative px-4 py-1 mx-auto my-0">
                                    Thursday, October 1st
                            </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex py-4 items-center">
                                    <div className="flex flex-2">
                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                    </div>
                                    <div className="w-full ml-2">
                                        <span className="leading-6 font-bold text-xl tracking-wide">Mark Taylor</span>
                                        <span className="inline-block text-lg tracking-wide mx-2">  11:53 PM </span>
                                    </div>
                                </div>
                                <div className="pr-10 pl-12">
                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What did you accomplish yesterday</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What are you planning to do today?</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">Is there anything blocking your progress</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-2">
                                <div className="flex py-4 items-center">
                                    <div className="flex flex-2">
                                        <img className="w-16 h-16 m-0 rounded-circle" alt="Deepak Sharma" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                    </div>
                                    <div className="w-full ml-2">
                                        <span className="leading-6 font-bold text-xl tracking-wide">Mark Taylor</span>
                                        <span className="inline-block text-lg tracking-wide mx-2">  11:53 PM </span>
                                    </div>
                                </div>
                                <div className="pr-10 pl-12">
                                    <div className="pr-6 relative h-full" style={{ maxHeight: 457 }}>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What did you accomplish yesterday</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">What are you planning to do today?</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                        <div className="relative my-4 px-3">
                                            <div className="bg-blue-400 absolute left-0 w-1 h-full rounded">

                                            </div>
                                            <div className="w-full ml-2">
                                                <h4 className="leading-6 font-bold text-lg tracking-wide">Is there anything blocking your progress</h4>
                                                <p className="text-lg tracking-wide">Rce6 e5 yyfcu</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="flex-auto p-4 px-3" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                        <div className=" rounded-lg p-6 mb-8">
                            <h2 className="leading-6 font-bold text-xl tracking-wider mb-4">
                                Date Range
                        </h2>
                            <div className="flex flex-col mb-8">
                                <NiceDatePicker />
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline justify-between">
                                    <h2 className="leading-6 font-bold text-xl tracking-wider mb-4">
                                        Participants
                                </h2>
                                    <div class="flex items-center">
                                        <label htmlFor="remember_me" class="mr-2 block text-sm leading-5 text-gray-900">
                                            All
                                        </label>
                                        <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />

                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center text-sm mb-2">
                                        <div className="mr-2 flex-3">
                                            {/* <img class="c-members-filter__avatar a-avatar a-avatar--sm" alt="Anshu" src="https://avatars.slack-edge.com/2020-08-01/1274642144997_f123c44ea88ca4600e8e_192.jpg"></img> */}
                                            <img className="w-8 h-8 m-0 rounded-circle" alt="Anshu" src="https://avatars.slack-edge.com/2020-08-01/1274642144997_f123c44ea88ca4600e8e_192.jpg" />
                                        </div>
                                        <div className="flex-auto flex-wrap font-bold">
                                            @Anshu Saurabh
                                    </div>
                                        <div class="flex items-center">

                                            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />

                                        </div>
                                    </div>
                                    <div className="flex items-center  text-sm mb-2">
                                        <div className="mr-2 flex-3">
                                            {/* <img class="c-members-filter__avatar a-avatar a-avatar--sm" alt="Anshu" src="https://avatars.slack-edge.com/2020-08-01/1274642144997_f123c44ea88ca4600e8e_192.jpg"></img> */}
                                            <img className="w-8 h-8 m-0 rounded-circle" alt="Anshu" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                        </div>
                                        <div className="flex-auto flex-wrap font-bold">
                                            @Brenda Samuels
                                    </div>
                                        <div class="flex items-center">

                                            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline justify-between">
                                    <h2 className="leading-6 font-bold text-xl tracking-wider mb-4">
                                        Questions
                                </h2>
                                    <div class="flex items-center">
                                        <label htmlFor="remember_me" class="mr-2 block text-sm leading-5 text-gray-900">
                                            All
                                        </label>
                                        <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />

                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center text-sm mb-2">
                                        <div className="flex-auto flex-wrap font-bold">
                                            <GoPrimitiveDot className="inline-block mb-1 text-teal-500 mr-2" />
                                        What did you accomplish yesterday?
                                    </div>
                                        <div class="flex items-center">
                                            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="flex items-center  text-sm mb-2">
                                        <div className="flex-auto flex-wrap font-bold">
                                            <GoPrimitiveDot className="inline-block  mb-1 text-teal-500 mr-2" />
                                        What are you planning to do today?
                                    </div>
                                        <div class="flex items-center">
                                            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="flex items-center  text-sm mb-2">
                                        <div className="flex-auto flex-wrap font-bold">
                                            <GoPrimitiveDot className="inline-block  mb-1 text-teal-500 mr-2" />
                                        Is there anything blocking your progress?
                                    </div>
                                        <div class="flex items-center">
                                            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Timeline
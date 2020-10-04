import React, { Component } from "react";
import { GoPrimitiveDot } from "react-icons/go"
import PieChart from "./PieChart"
import stc from "string-to-color"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ date: 0, value: 50 }, { date: 0, value: 50 }]
        }
    }
    render() {
        const { data } = this.state;
        return (
            <div className="bg-white animate-fadesunnyin">
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
                                        <GoPrimitiveDot className="inline-block text-xl mb-1 mr-2"
                                            style={{ color: stc("What did you do yesterday?") }} />
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
        )
    }
}
export default Insights
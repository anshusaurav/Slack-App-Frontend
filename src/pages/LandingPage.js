import React, { Component } from 'react'
import Typical from 'react-typical'
import Header from '../components/Header';
import Footer from '../components/Footer';
import SingupSection from '../components/SingupSection';
class LandingPage extends Component {
    render() {
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <Header/>
                <div
                    className="py-20"
                    style={{ backgroundImage: `url("${require('./../svgs/pattern-light.svg')}"), linear-gradient(90deg, #667eea 0%, #764ba2 100%)` }}
                >
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-2 leading-10 md:mb-4 text-white">
                            Automate standups, surveys, and daily reports
        </h2>
                        <h3 className="text-2xl mb-2 leading-8 text-gray-200">
                            Run
                            {" "}<span className="text-teal-300">
                                <Typical
                                    steps={[
                                        "standup meetings",
                                        4000,
                                        "employee engagement surveys",
                                        8000,
                                        "your custom team Questionnaires",
                                        8000,
                                        "meeting notes",
                                        4000,
                                        "today I learned progress",
                                        6000
                                    ]}
                                    loop={Infinity}
                                    wrapper="b"
                                />{" "}
                            </span>
                            in Slack

                        </h3>
                        <a href="https://slack.com/oauth/v2/authorize?client_id=401428056419.1387902464068&scope=channels:read,chat:write,chat:write.customize,chat:write.public,im:history,users:read,users:write,channels:history&user_scope=channels:read,users:read"

                            className="inline-flex justify-around items-center py-6 px-6 sm:px-8 md:px-24 bg-white border-2 
                            border-white text-lg md:text-xl font-bold text-gray-700 rounded-100 h-16 cursor-pointer focus:outline-none hover:shadow-xl hover:text-gray-800"
                        >
                            <img src="/images/slack-logo-icon.png" className="w-8 h-8 align-middle border-none mr-4" alt="Slack Logo" />
                            Add to Slack
                        </a>
                        <div className="text-xs mt-4 text-white"> Start your free trial today.</div>
                    </div>
                </div>
                <section className="container mx-auto px-6 p-10">
                    <h2 className="text-4xl font-bold text-center text-gray-700 mb-8 ">
                        Features
                    </h2>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/2">
                            <h4 className="text-3xl text-gray-700 font-bold mb-3 md:text-center">
                                Daily Standups
                            </h4>
                            <p className="text-gray-600 mb-8 text-xl leading-8 md:text-center">

                                Keep your team in the loop - with regular updates on progress
                                and blockers. Geekbot automates recurring tasks. It runs daily standups,
                                collects surveys, shares responses, and posts updates to your slack
                                channels at a time and pace that suits.
                                
                        </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img src="/images/daily.jpg" alt="Monitoring" />
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                            <img src="/images/learned-new.jpg" alt="Reporting" />
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <h4 className="text-3xl text-gray-700 font-bold mb-3 md:text-center">
                                Today I Learned
                            </h4>
                            <p className="text-gray-600 mb-8 text-xl leading-8 md:text-center">

                                Knowledge should be shared!
                                Inspire others to learn something new, or just brag.
                                Now you can focus on the things that actually matter.
                                
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/2">
                            <h4 className="text-3xl text-gray-700 font-bold mb-3 md:text-center">
                                Team Feedback
                            </h4>
                            <p className="text-gray-600 mb-8 text-xl leading-8 md:text-center">

                                Tell your people how they’re doing - sharing feedback to keep
                                your squad in the loop. Build a culture of communication across
                                borders and timezones, so your people can perform at their best.
                                
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img src="/images/feedback.jpg" alt="Syncing" />
                        </div>
                    </div>
                </section>

                <SingupSection/>
                <Footer/>
            </div>
        )
    }
}
export default LandingPage;
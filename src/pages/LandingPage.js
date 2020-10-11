import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';
import Typical from 'react-typical'
import { Link, NavLink } from 'react-router-dom'
class LandingPage extends Component {
    render() {
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <nav style={{ fontFamily: "'Nunito', sans-serif" }}>
                    <div
                        className="container mx-auto px-6 py-2 flex justify-between items-center"
                    >
                        <Link
                            className="font-extrabold text-2xl lg:text-4xl flex align-center items-center"
                            to="/"
                        ><img src="/images/icon.png" className="w-12 h-12 align-middle border-none" alt="Slack Logo" />
                            Pup<span className="text-blue-500">bot</span>
                        </Link>
                        <div className="block lg:hidden">
                            <button
                                className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
                            >
                                <svg
                                    className="fill-current h-3 w-3"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            <ul className="inline-flex">
                                <li>
                                    <NavLink className="px-4 font-bold" to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className="px-4 hover:text-gray-800" to="/about"
                                    >About</NavLink>
                                </li>
                                <li>
                                    <NavLink className="px-4 hover:text-gray-800" to="/contact"
                                    >Contact</NavLink>
                                </li>
                                <li>
                                <a href="https://slack.com/oauth/v2/authorize?client_id=401428056419.1387902464068&scope=channels:read,chat:write,chat:write.customize,chat:write.public,im:history,users:read,users:write,channels:history&user_scope=channels:read,users:read"
                                    className="px-6   border-2 border-gray-700 hover:border-gray-900  rounded-lg  focus:outline-none hover:text-gray-800"
                                    >
                                    Login
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
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
                                        "employee engagement survey",
                                        8000,
                                        "your custom team Questionnaire",
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

                <section style={{ backgroundImage: `url("${require('./../svgs/pattern-dark.svg')}"), linear-gradient(90deg,  #2f2040 0%, #394681 100%)` }}>
                    <div className="container mx-auto px-6 text-center py-20">
                        <h2 className="mb-6 text-4xl font-bold text-center text-white">
                            Limited Free Access
                        </h2>
                        <h3 className="my-4 text-2xl text-white">
                            Set daily activities to auto - it takes less than a minute.
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
                </section>
                <footer className="bg-gray-100">
                    <div className="container mx-auto px-6 pt-10 pb-6">
                        <div className="flex flex-wrap justify-between text-center">
                            <div className="w-full md:w-1/4 flex justify-center">
                                <a class="font-extrabold text-4xl lg:text-6xl flex align-center items-center pb-2" href="#">
                                    <img src="/images/icon.png" class="w-16 h-16 align-middle border-none" alt="Slack Logo" />
                                Pup<span className="text-blue-500">bot</span>
                                </a>
                            </div>
                            <div className="w-full md:w-1/4 ">
                                <h5 className="uppercase mb-6 font-bold">Links</h5>
                                <ul className="mb-4">
                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >FAQ</Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >Help</Link>
                                    </li>

                                </ul>
                            </div>
                            <div className="w-full md:w-1/4">
                                <h5 className="uppercase mb-6 font-bold">Legal</h5>
                                <ul className="mb-4">
                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >Terms</Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >Privacy</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="w-full md:w-1/4">
                                <h5 className="uppercase mb-6 font-bold">Company</h5>
                                <ul className="mb-4">

                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >About Us</Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="#"
                                            className="hover:underline text-gray-600 hover:text-orange-500"
                                        >Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
export default LandingPage;
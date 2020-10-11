import React from 'react'
import { Link, NavLink } from 'react-router-dom'
export default function Header() {
    return (
        <nav>
            <div
                className="container mx-auto px-6 py-2 flex justify-between items-center"
            >
                <Link style={{ fontFamily: "'Nunito', sans-serif" }}
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
    )
}

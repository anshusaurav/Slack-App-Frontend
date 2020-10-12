import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Transition } from "@headlessui/react";
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
                    <div className="relative inline-block text-left z-10000">
                        <Menu>
                            {({ open }) => (
                                <>
                                    <span className="rounded-md shadow-sm">
                                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                                            <svg
                                                className="fill-current h-3 w-3"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>Menu</title>
                                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                            </svg>
                                        </Menu.Button>
                                    </span>

                                    <Transition
                                        show={open}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                        >
                                            <div className="py-1 text-center">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/"
                                                            className={`${active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                                } flex justify-between w-full px-4 py-2 text-sm leading-5`}
                                                        >
                                                            Home
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/about"
                                                            className={`${active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                                } flex justify-between w-full px-4 py-2 text-sm leading-5`}
                                                        >
                                                            About
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item
                                                    as="span"
                                                    disabled
                                                    className="flex justify-between w-full px-4 py-2 text-sm leading-5  text-gray-700 cursor-not-allowed opacity-50"
                                                >
                                                    FAQs (soon)
                                                    </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/contact"
                                                            className={`${active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                                } flex justify-between w-full px-4 py-2 text-sm leading-5 `}
                                                        >
                                                            Contact
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                            <div className="">
                                                <a href="https://slack.com/oauth/v2/authorize?client_id=401428056419.1387902464068&scope=channels:read,chat:write,chat:write.customize,chat:write.public,im:history,users:read,users:write,channels:history&user_scope=channels:read,users:read" className="text-sm w-full flex   px-4 py-2 font-medium leading-5 text-gray-900 truncate">
                                                    Login
                                                </a>
                                            </div>


                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <ul className="inline-flex">
                        <li>
                            <NavLink className="px-4 hover:text-gray-800" to="/" exact activeClassName="font-bold">
                                Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="px-4 hover:text-gray-800" to="/about" exact activeClassName="font-bold">
                                About</NavLink>
                        </li>
                        <li>
                            <NavLink className="px-4 hover:text-gray-800" to="/contact" exact activeClassName="font-bold">
                                Contact</NavLink>
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

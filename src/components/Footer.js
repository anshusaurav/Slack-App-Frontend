import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto px-6 pt-10 pb-6">
                <div className="flex flex-wrap justify-between text-center">
                    <div className="w-full md:w-1/4 flex justify-center">
                        <Link class="font-extrabold text-4xl lg:text-6xl flex align-center items-center pb-2" to="/"
                            style={{ fontFamily: "'Nunito', sans-serif" }}>
                            <img src="/images/icon.png" class="w-16 h-16 align-middle border-none" alt="Slack Logo" />
                                Pup<span className="text-blue-500">bot</span>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/4 ">
                        <h5 className="uppercase mb-6 font-bold">Links</h5>
                        <ul className="mb-4">
                            <li className="mt-2">
                                <Link
                                    to="/faq"
                                    className="hover:underline text-gray-600 hover:text-orange-500"
                                >FAQ</Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    to="/contact"
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
                                    to="/terms"
                                    className="hover:underline text-gray-600 hover:text-orange-500"
                                >Terms</Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    to="/privacy"
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
    )
}

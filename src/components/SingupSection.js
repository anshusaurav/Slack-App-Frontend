
import React from 'react'

export default function SingupSection() {
    return (
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
    )
}

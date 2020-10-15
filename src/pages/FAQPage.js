import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQHero from "../components/FAQHero";
import SignupSection from '../components/SignupSection';
class FAQPage extends Component {
    render() {
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <Header />
                <FAQHero />
                <section className="text-gray-700 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col w-full mb-12">


                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">I’ve just set up my pupbot. What comes next?</h2>
                            <p className="leading-relaxed text-base mb-6">Simply wait for the time you told Pupbot to start the standup. When that time comes Pupbot will send you a direct message with the standup questions.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">What will Pupbot do as soon as it is time for a meeting?</h2>
                            <p className="leading-relaxed text-base mb-6">As soon as it is time for a meeting Pupbot will send a direct message to all the participants in the standup.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">What if i don’t have anything to answer to a question?</h2>
                            <p className="leading-relaxed text-base mb-6">Simply answer with the word <code>nothing</code>, <code>nope</code>, <code>none</code>, no or <code>-</code> and Geekbot will omit this answer from your report. This way your broadcast channel will not be full of unnecessary information.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">What happens if i don’t answer at all?</h2>
                            <p className="leading-relaxed text-base mb-6">The current standup eventually expires and you can no longer report for that day. Geekbot will just ask again the next time you have a scheduled standup meeting.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">How can i edit my posted report?</h2>
                            <p className="leading-relaxed text-base mb-6">This Feature will be available soon. Right now you can't edit your response</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">Where can the reports be published?</h2>
                            <p className="leading-relaxed text-base mb-6">You can set Pupbot to publish them in a broadcast channel along with creator of standup in Slack. This channel can be either public or private. Being able to broadcast in private channels means that you can have standups with specific members without spamming your whole team. Keep in mind though you have to invite Pupbot to a private channel in order for it to be able to post there.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">Can i have more than one standups in one account?</h2>
                            <p className="leading-relaxed text-base mb-6">You can create multiple standups from your dashboard home. Just press the Add new Standup button at the top and setup your new standup.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">How can i edit a standup?</h2>
                            <p className="leading-relaxed text-base mb-6">Right now you can't edit your standups. This feature will be up very soon.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">How can i add new participants to a standup?</h2>
                            <p className="leading-relaxed text-base mb-6">You can sync the standup participants with the broadcast channel. This way any members being added to or removed from the Slack channel will be updated in the standup as well.</p>
                            <h2 className="text-base leading-relaxed font-bold title-font mb-4 text-gray-900">Can i tell Pupbot not to ping me during my vacation time?</h2>
                            <p className="leading-relaxed text-base mb-6">When it’s your day off or you are on vacation, you can go on your standup and pause it whenever you want. Pupbot will pause your standup. Anytime you want to start reporting again, you can find resume button at the same place.</p>
                        </div>
                    </div>
                </section>
                <SignupSection />
                <Footer />
            </div>
        )
    }
}
export default FAQPage
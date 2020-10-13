import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignupSection from '../components/SignupSection';
import AboutHero from '../components/AboutHero'
class AboutPage extends Component {
    render() {
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <Header />
                <AboutHero />

                <section class="text-gray-700 body-font">
                    <div class="container px-5 py-24 mx-auto flex flex-wrap">
                        <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                            <img alt="feature" class="object-contain object-center h-full w-full" src="/images/1.jpg" />
                        </div>
                        <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Name your report</h2>
                                    <p class="leading-relaxed text-base">First thing you need to do is name your report to signify the nature of the meeting. Now, you can choose your team’s time-zone</p>


                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Schedule your report</h2>
                                    <p class="leading-relaxed text-base">To schedule your report,set the time and the days you would like the report to take place so Pupbot knows when to ask questions to your team.</p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Setting report intro message and questions</h2>
                                    <p class="leading-relaxed text-base">You can add questions to your team’s specific needs. You can add multiple questions which will be asked in sequence they are added. </p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Setting broadcast channel</h2>
                                    <p class="leading-relaxed text-base">Pupbot posts all of your team’s responses to a channel of your choice in the form of updates. If it’s an existing channel you can select it from the drop down menu. </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="text-gray-700 body-font">
                    <div class="container px-5 py-24 mx-auto flex flex-wrap">
                        <div class="lg:w-1/2 w-full order-1 lg:order-2  mb-10 lg:mb-0 rounded-lg overflow-hidden">
                            <img alt="feature" class="object-contain object-center h-full w-full" src="/images/2.jpg" />
                        </div>
                        <div class="flex flex-col order-2 lg:order-1  flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Dashboard</h2>
                                    <p class="leading-relaxed text-base">Access your dashboard for insights on your team’s engagement & progress and find out who has blocking issues. </p>


                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Creating new reports</h2>
                                    <p class="leading-relaxed text-base">Having multiple reports helps you organize your team’s departments or different projects more efficiently, so don’t hesitate to create more than one.</p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Pause/Resume</h2>
                                    <p class="leading-relaxed text-base">Pause any report any time if needed. pause a report instead of deleting it, in order to keep all your data stored for future reference.
                                    Pause a report for your whole team and resume at any point where you left off.</p>

                                </div>
                            </div>

                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Viewing reports</h2>
                                    <p class="leading-relaxed text-base">Get the most out of your dashboard by monitoring your team’s reports in the timeline.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="text-gray-700 body-font">
                    <div class="container px-5 py-24 mx-auto flex flex-wrap">
                        <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                            <img alt="feature" class="object-contain object-center h-full w-full" src="/images/3.jpg" />
                        </div>
                        <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Day-wise Insights</h2>
                                    <p class="leading-relaxed text-base">Get the most out of your Insights by monitoring your team’s reports with the help of simple prev and next date buttons. Next to the date on the bottom of insights, you will find the prev and next buttons.</p>


                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Question-wise Summary</h2>
                                    <p class="leading-relaxed text-base">Get the responses of participants grouped with questions.</p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Participation in percent</h2>
                                    <p class="leading-relaxed text-base">No more hidden information in private chats, all accomplishments and road blocks are available for all team members. </p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Work more attend fewer meetings</h2>
                                    <p class="leading-relaxed text-base">Being asynchronous however can have benefits that not only remote teams get to enjoy. </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="text-gray-700 body-font">
                    <div class="container px-5 py-24 mx-auto flex flex-wrap">
                        <div class="lg:w-1/2 w-full order-1 lg:order-2  mb-10 lg:mb-0 rounded-lg overflow-hidden">
                            <img alt="feature" class="object-contain object-center h-full w-full" src="/images/4.jpg" />
                        </div>
                        <div class="flex flex-col order-2 lg:order-1  flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Help your team thrive</h2>
                                    <p class="leading-relaxed text-base">Now you can focus on the things that actually matter. </p>


                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Filter by participants and questions</h2>
                                    <p class="leading-relaxed text-base">Having ability to filter with paritipants and questions gives clear impression about each participant and question.</p>

                                </div>
                            </div>
                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Data-driven insight</h2>
                                    <p class="leading-relaxed text-base">Pupbot tracks team morale on a daily basis, so you know when to step in should the workload get too much. </p>

                                </div>
                            </div>

                            <div class="flex flex-col mb-10 lg:items-start items-center">

                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Align your team seamlessly</h2>
                                    <p class="leading-relaxed text-base">Provide your team with a system that breeds transparency. You will be able to distribute and consume all your work related information much faster, since it will all be in one public channel for everyone to access.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <SignupSection />
                <Footer />
            </div >
        )
    }

}
export default AboutPage;
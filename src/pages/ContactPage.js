import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactHero from "../components/ContactHero";
import SingupSection from '../components/SingupSection';
import { SEND_MESSAGE } from "../graphql/queries"
import { executeOperation } from "../graphql/helpers";
class ContactPage extends Component {
    state = {
        email: '',
        name: '',
        message: '',
        isSubmitting: false,
        isReady: false,

    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };
    submitMessage = (event) => {
        event.preventDefault();
        this.setState({ isSubmitting: true }, async () => {
            const { name, email, message } = this.state;
            const res = await executeOperation({
                name, email, message
            }, SEND_MESSAGE)
            if (res.errors)
                return;
            this.setState({ name: '', email: '', message: '', isSubmitting: false });
        })

    }

    render() {
        const { name, email, message, isSubmitting } = this.state;
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <Header />
                <ContactHero />
                <section class="text-gray-700 body-font relative">
                    <div class="container px-5 py-24 mx-auto flex sm:flex-no-wrap flex-wrap">
                        <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                            <iframe title="MapContact" class="absolute inset-0" style={{
                                width: "100%", height: "100%",
                                frameborder: "0", marginheight: "0", marginwidth: "0", scrolling: "no", filter: "grayscale(1) contrast(1.2) opacity(0.4)"
                            }} src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0AltCampus&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" ></iframe>
                            <div class="bg-white relative flex flex-wrap py-6">
                                <div class="lg:w-1/2 px-6">
                                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm">ADDRESS</h2>
                                    <p class="leading-relaxed">Alt-Campus, ward no 15, Thehr, Kangra</p>
                                </div>
                                <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm">EMAIL</h2>
                                    <a class="text-blue-500 leading-relaxed" href="mailto:anshu.saurav@gmail.com">anshu.saurav@gmail.com</a>
                                    <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mt-4">PHONE</h2>
                                    <p class="leading-relaxed">+91-9667694292</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.submitMessage} class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback/Queries</h2>
                            <p class="leading-relaxed mb-5 text-gray-600">We're here to answer your questions about pupbot. Ask us anything.</p>

                            <input required onChange={this.handleChange}
                                name="name"
                                value={name}
                                class="bg-white rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4"
                                placeholder="Name"
                                type="text" />
                            <input required onChange={this.handleChange} name="email" value={email} class="bg-white rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
                            <textarea required onChange={this.handleChange} name="message" value={message} class="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-blue-500 text-base px-4 py-2 mb-4 resize-none" placeholder="Message"></textarea>
                            <button class="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg relative">
                                <span class={`flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1 rounded-full bg-blue-500 opacity-75 ${isSubmitting ? 'animate-ping' : 'hidden'}`}></span>Send us a message</button>

                        </form>
                    </div>
                </section>

                <SingupSection />
                <Footer />
            </div >
        )
    }

}
export default ContactPage;
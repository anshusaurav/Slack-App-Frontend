import React, { Component } from "react";

export default class HomePage extends Component {
  componentDidMount() {
    document.title = "Home | Standup Bot";
  }

  render() {
    // const isProcessing = this.props.isProcessing || false;
    return (


      <div className="bg-gray-100 px-4 py-5 text-blue-700 w-screen 
            h-screen flex items-center justify-center"style={{ backgroundImage: "url('/images/space-objects-seamless-vector-pattern-repeat-background.jpg')" }} >
        <div
          style={{ boxShadow: "9px -2px 43px -8px rgba(0,0,0,1)", backgroundColor: '#0d2031d1' }}
          className="mx-auto flex flex-col justify-center items-center 
                px-12  py-20">
          <h1 className="text-4xl text-center text-white font-bold font-sans tracking-wide">
            PupBot
                </h1>
          <img
            src="/images/bot.png"
            alt="pup-bot"
            className="rounded-full my-12"
            width="180px"
          />
          <a href="https://slack.com/oauth/v2/authorize?client_id=401428056419.1387902464068&scope=channels:read,chat:write,chat:write.customize,chat:write.public,im:history,users:read,users:write,channels:history&user_scope=channels:read,users:read"
            className="flex justify-center items-center py-6 px-6 sm:px-12 md:px-24 bg-white border-2 
            border-white text-lg md:text-xl font-bold text-gray-700 rounded-100 h-16 cursor-pointer focus:outline-none hover:shadow-xl hover:text-gray-800">
            <img src="/images/slack-logo-icon.png" className="w-8 h-8 align-middle border-none mr-2" alt="Slack Logo" />
            Add to Slack
          </a>
          {/* <a href="https://slack.com/oauth/v2/authorize?client_id=401428056419.1387902464068&scope=channels:read,chat:write,chat:write.customize,chat:write.public,im:history,users:read,users:write,channels:history&user_scope=channels:read,users:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a> */}
        </div>
      </div>

    )
  }
}

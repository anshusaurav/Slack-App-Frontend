import React, { Component } from "react";

export default class HomePage extends Component {
  componentDidMount() {
    document.title = "Home | Standup Bot";
  }

  render() {
    return (
      <div className="bg-gray-800 px-4 py-5 text-blue-700 w-screen h-screen flex items-center justify-center">
        <div
          style={{ boxShadow: "9px -2px 43px -8px rgba(0,0,0,1)" }}
          className="mx-auto flex flex-col justify-center items-center px-32  py-16"
        >
          <h1 className="text-3xl text-white font-bold font-sans">Pup Bot</h1>
          <img
            src="/images/bot.png"
            alt="pup-bot"
            className="rounded-full my-12"
            width="180px"
          />
          <a href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook&client_id=401428056419.1387902464068">
            <img
              alt="Add to Slack"
              height="20"
              width="140"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        </div>
      </div>
    )
  }
}

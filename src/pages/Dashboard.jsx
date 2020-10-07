import React, { Component } from "react";
import MyStandups from "../components/MyStandups";
import { LoaderPage } from "../components/LoaderPage";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.slackUser ? (
            <MyStandups
              channels={this.props.channels}
              members={this.props.members}
              slackUser={this.props.slackUser}
              userProfile={this.props.userProfile}
              toggleLoggedIn={this.props.toggleLoggedIn}
              channelMembers={this.props.channelMembers}
            />
          ) : (
              <LoaderPage />
            )}
        </div>
        ;
      </div>
    );
  }
}

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
              userProfileInfo={this.props.userProfileInfo}
              slackUser={this.props.slackUser}
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

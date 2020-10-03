import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { WebClient } from "@slack/web-api";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CreateStandup from "./components/CreateStandup";
import SingleStandup from "./components/SingleStandup"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slackUser: null,
      channels: [],
      userProfileInfo: null,
    };
  }

  componentDidMount() {
    this.accessToken();
  }

  accessToken = async () => {
    let currentURL = document.location.search;
    let code = await currentURL.slice(6, -7);
    var result;
    try {
      result = await new WebClient().oauth.v2.access({
        code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      });
      if (result.ok) {
        this.setState({ slackUser: result });
        localStorage.setItem("user-data", JSON.stringify(result));
        return this.setState({ slackUser: result }, () => this.accessData());
      }
    } catch (err) {
      return this.setState(
        {
          slackUser: JSON.parse(localStorage.getItem("user-data")),
        },
        () => this.accessData()
      );
    }
  };

  accessData = () => {
    const accessUser = async () => {
      try {
        const result = await new WebClient().users.info({
          token: this.state.slackUser.access_token,
          user: this.state.slackUser.authed_user.id,
        });
        this.setState({ userProfileInfo: result.user });
        return localStorage.setItem(
          "userProfileInfo",
          JSON.stringify(result.user)
        );
      } catch (error) {
        return this.setState({
          userProfileInfo: JSON.parse(localStorage.getItem("userProfileInfo")),
        });
      }
    };

    const accessChannels = async () => {
      try {
        new WebClient(this.state.slackUser.access_token).conversations
          .list()
          .then((res) => {
            this.setState({ channels: res.channels });
            localStorage.setItem("channels", JSON.stringify(res.channels));
          });
      } catch (err) {
        return this.setState({
          channels: JSON.parse(localStorage.getItem("channels")),
        });
      }
    };
    accessUser();
    accessChannels();
  };

  render() {
    console.log(this.state.userProfileInfo);
    return (

      <Router>
        <Route exact path="/">
          {this.state.userProfileInfo ? (
            <Redirect to="/dashboard" />
          ) : (
              <HomePage />
            )}
        </Route>
        <Route exact path="/dashboard">
          <Dashboard
            slackUser={this.state.slackUser}
            userProfileInfo={this.state.userProfileInfo}
          />
        </Route>
        <Route exact path="/dashboard/create">
          <CreateStandup
            channels={this.state.channels}
            slackUser={this.state.slackUser}
          />
        </Route>
        <Route exact path='/standups/:id'>
          <SingleStandup
            slackUser={this.state.userProfileInfo}>
          </SingleStandup>
        </Route>
      </Router>

    );
  }
}
export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WebClient } from "@slack/web-api";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CreateStandup from "./pages/CreateStandup";
import SingleStandup from "./pages/SingleStandup"
import EditStandup from "./pages/EditStandup"
import { LoaderPage } from "./components/LoaderPage"
import {
  getChannelsUsingCursor, getAllMembersUsingCursor,
  remove_duplicates, getMemberInfo
} from "./slack/helpers"
import { executeOperation } from "./graphql/helpers";
import { FETCH_WORKSPACE, CREATE_WORKSPACE, UPDATE_WORKSPACE } from "./graphql/queries"

class App extends React.Component {


  state = {
    slackUser: null,
    channels: [],
    members: [],
    channelMembers: [],
    userProfile: null,
    isLoggedIn: false,
    isProcessing: false,
    token: null
  };

  fetchUserAndChannels = async () => {

    if (
      localStorage.getItem('slackUser') &&
      localStorage.getItem('token') &&
      localStorage.getItem('channels') &&
      localStorage.getItem('members') &&
      localStorage.getItem('userProfile') &&
      localStorage.getItem('channelMembers')
    ) {
      this.setState({
        slackUser: JSON.parse(localStorage.getItem('slackUser')),
        token: JSON.parse(localStorage.getItem('token')),
        channels: JSON.parse(localStorage.getItem('channels')),
        members: JSON.parse(localStorage.getItem('members')),
        userProfile: JSON.parse(localStorage.getItem('userProfile')),
        channelMembers: JSON.parse(localStorage.getItem('channelMembers')),
        isLoggedIn: true,
      });
    }
    else {
      const currentURL = document.location.search;

      const code = currentURL.slice(6, -7);
      if (!code)
        return;
      try {
        this.setState({ isProcessing: true }, async () => {
          const result = await new WebClient().oauth.v2.access({
            code,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
          });
          console.log(result)
          if (result.ok) {
            console.log('Result:', result)
            const slackUser = result.authed_user;
            const token = result.access_token;
            const user = result.authed_user.id;
            const team = result.team.id;
            //Add user is in database if not saved
            const checkWSRes = await executeOperation({ slack_id: team }, FETCH_WORKSPACE);
            console.log(checkWSRes)

            if (!checkWSRes.data.workspace_by_pk) {
              const createWSRes = await executeOperation({ slack_id: team, token }, CREATE_WORKSPACE);
              if (createWSRes.errors)
                return;
            }
            else {
              const updateWSRes = await executeOperation({ slack_id: team, token }, UPDATE_WORKSPACE);
              if (updateWSRes.errors)
                return;
            }
            const userProfileResult = await new WebClient().users.info({
              token,
              user
            });
            const userProfile = userProfileResult.user;
            let channels = await getChannelsUsingCursor(token);
            channels = channels.filter(channel => !channel.is_archived)
            const channelMapRequests = channels
              .map(channel => getAllMembersUsingCursor(token, channel.id));
            const channelMapResults = await Promise.all(channelMapRequests);

            const channelMembers = channels.map((channel, index) => (
              { id: channel.id, members: channelMapResults[index].filter(member => !member.is_bot) }
            ))
            let membersArr = [];

            channelMapResults.forEach(channelMapResult => {
              membersArr = membersArr.concat(channelMapResult)
            })
            membersArr = remove_duplicates(membersArr);
            const MemberRequests = membersArr
              .map(user => getMemberInfo(token, user));

            const members = await Promise.all(MemberRequests);

            this.setState({
              slackUser, userProfile, members, channelMembers,
              channels, token, isLoggedIn: true, isProcessing: false
            }, () => {
              console.log('Setteed state');
              localStorage.setItem('slackUser', JSON.stringify(slackUser))
              localStorage.setItem('userProfile', JSON.stringify(userProfile))
              localStorage.setItem('token', JSON.stringify(token))
              localStorage.setItem('members', JSON.stringify(members))
              localStorage.setItem('channels', JSON.stringify(channels))
              localStorage.setItem('channelMembers', JSON.stringify(channelMembers))

            });


          }
        });

      } catch (err) {
        console.log('HERE', err);
        return;
      }
    }
  };
  toggleLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn })
  }
  componentDidMount() {
    this.fetchUserAndChannels();
  }

  render() {
    const { isLoggedIn, channels, members, channelMembers,
      slackUser, userProfile, isProcessing, token } = this.state;

    return (

      <Router>
        <Route exact path="/">
          {isLoggedIn ? (
            <Dashboard
              channels={channels}
              members={members}
              channelMembers={channelMembers}
              slackUser={slackUser}
              userProfile={userProfile}
              token={token}
              toggleLoggedIn={this.toggleLoggedIn}
            />
          ) : (
              isProcessing ?
                <LoaderPage /> :
                <HomePage />
            )
          }
        </Route>
        <Route exact path="/dashboard">
          {
            isLoggedIn ? (
              <Dashboard
                channels={channels}
                members={members}
                channelMembers={channelMembers}
                slackUser={slackUser}
                userProfile={userProfile}
                token={token}
                toggleLoggedIn={this.toggleLoggedIn}
              />
            ) : (
                isProcessing ?
                  <LoaderPage /> :
                  <HomePage />
              )
          }

        </Route>
        <Route exact path="/dashboard/create">
          {
            isLoggedIn ? (
              <CreateStandup
                channels={channels}
                members={members}
                channelMembers={channelMembers}
                slackUser={slackUser}
                userProfile={userProfile}
                token={token}
                toggleLoggedIn={this.toggleLoggedIn}
              />) : (<HomePage />)
          }
        </Route>
        <Route exact path='/standups/:id'>
          {
            isLoggedIn ? (
              <SingleStandup
                channels={channels}
                members={members}
                channelMembers={channelMembers}
                slackUser={slackUser}
                userProfile={userProfile}
                token={token}
                toggleLoggedIn={this.toggleLoggedIn}
              />) : (<HomePage />)
          }
        </Route>
        <Route exact path='/standups/:id/edit'>
          {
            isLoggedIn ? (
              <EditStandup
                channels={channels}
                members={members}
                channelMembers={channelMembers}
                slackUser={slackUser}
                userProfile={userProfile}
                token={token}
                toggleLoggedIn={this.toggleLoggedIn} />
            ) : (<HomePage />)
          }
        </Route>
      </Router>

    );
  }
}
export default App;

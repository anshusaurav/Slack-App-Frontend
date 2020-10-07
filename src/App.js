import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WebClient } from "@slack/web-api";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CreateStandup from "./components/CreateStandup";
import SingleStandup from "./components/SingleStandup"
import EditStandup from "./components/EditStandup"
import { LoaderPage } from "./components/LoaderPage"
import {
  getChannelsUsingCursor, getAllMembersUsingCursor,
  remove_duplicates, getMemberInfo
} from "./slack/helpers"

class App extends React.Component {


  state = {
    slackUser: null,
    channels: [],
    members: [],
    channelMembers: [],
    userProfile: null,
    isLoggedIn: false,
    isProcessing: false,
  };

  fetchUserAndChannels = async () => {

    if (
      localStorage.getItem('slackUser') &&
      localStorage.getItem('channels') &&
      localStorage.getItem('members') &&
      localStorage.getItem('userProfile') &&
      localStorage.getItem('channelMembers')
    ) {
      this.setState({
        slackUser: JSON.parse(localStorage.getItem('slackUser')),
        channels: JSON.parse(localStorage.getItem('channels')),
        members: JSON.parse(localStorage.getItem('members')),
        userProfile: JSON.parse(localStorage.getItem('userProfile')),
        channelMembers: JSON.parse(localStorage.getItem('channelMembers')),
        isLoggedIn: true,
        // isProcessing: true,
      });
    }
    else {
      // this.setState({ isProcessing: true })
      const currentURL = document.location.search;
      const code = await currentURL.slice(6, -7);
      console.log(code);

      try {
        // this.setState({ isProcessing: true });
        console.log('-1')
        const result = await new WebClient().oauth.v2.access({
          code,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        });
        console.log('0')
        localStorage.setItem('code', code);
        if (result.ok) {
          const slackUser = result.authed_user;
          const token = result.access_token;
          const user = result.authed_user.id;
          const userProfileResult = await new WebClient().users.info({
            token,
            user
          });
          const userProfile = userProfileResult.user;
          let channels = await getChannelsUsingCursor(token);
          console.log('1');
          channels = channels.filter(channel => !channel.is_archived)
          const channelMapRequests = channels
            .map(channel => getAllMembersUsingCursor(token, channel.id));
          const channelMapResults = await Promise.all(channelMapRequests);
          console.log('w');
          console.log('dasdasdwqeqweqw', channelMapResults);
          const channelMembers = channels.map((channel, index) => (
            { id: channel.id, members: channelMapResults[index].filter(member => !member.is_bot) }
          ))
          console.log('3');
          let membersArr = [];

          channelMapResults.forEach(channelMapResult => {
            membersArr = membersArr.concat(channelMapResult)
          })
          membersArr = remove_duplicates(membersArr);
          const MemberRequests = membersArr
            .map(user => getMemberInfo(token, user));
          console.log('4');

          const members = await Promise.all(MemberRequests);

          console.log(members, channels, channelMembers)
          this.setState({
            slackUser, userProfile, members, channelMembers,
            channels, isLoggedIn: true, isProcessing: false
          }, () => {
            console.log('Setteed state');
            localStorage.setItem('slackUser', JSON.stringify(slackUser))
            localStorage.setItem('userProfile', JSON.stringify(userProfile))
            localStorage.setItem('members', JSON.stringify(members))
            localStorage.setItem('channels', JSON.stringify(channels))
            localStorage.setItem('channelMembers', JSON.stringify(channelMembers))

          });


        }
      } catch (err) {
        console.log(err);
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
      slackUser, userProfile, isProcessing } = this.state;

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
              toggleLoggedIn={this.toggleLoggedIn}
            />
          ) : (isProcessing && !isLoggedIn ? (<LoaderPage />) : (
            <HomePage isLoggedIn={isLoggedIn} />)
            )}
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
                toggleLoggedIn={this.toggleLoggedIn}
              />
            ) : (<HomePage />)
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
                toggleLoggedIn={this.toggleLoggedIn} />
            ) : (<HomePage />)
          }
        </Route>
      </Router>

    );
  }
}
export default App;

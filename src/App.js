import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';

import Firebase from './Firebase/Firebase';
import styles from './App.module.css';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Meetings from './containers/Meetings/Meetings';
import CheckIn from './containers/CheckIn/CheckIn';
import Attendees from './containers/Attendees/Attendees';
import Navigation from './containers/Navigation/Navigation';


class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      name: null,
      userID: null
    };
  }

  componentDidMount() {

    Firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          name: FBUser.name,
          userID: FBUser.uid
        });

        const meetingsRef = Firebase.database().ref('meeting-5050/' + FBUser.uid);

        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
    
  }

  signupUser = userName => {
    Firebase.auth().onAuthStateChanged( FBUser => {
      FBUser.updateProfile({
        name: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          name: FBUser.name,
          userID: FBUser.uid
        });
        navigate('/meetings');
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      name: null,
      userID: null,
      user: null
    });

    Firebase.auth().signOut().then(() => { navigate('/login'); } );

  };

  addMeeting = meetingName => {
    const ref = Firebase.database().ref(`meeting-5050/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div className={styles.App}>
      
        <Layout>
            
            <Navigation
              user={this.state.user}
              logOutUser={this.logOutUser}
            />
            
            <main className={styles.content}>

              <Router>
                
                <Home path="/" user={this.state.user} />
                
                <Login path="/login" />
                
                <Meetings
                  path="/meetings"
                  meetings={this.state.meetings}
                  addMeeting={this.addMeeting}
                  userID={this.state.userID}
                />

                <Attendees
                  path="/attendees/:userID/:meetingID"
                  adminUser={this.state.userID}
                />

                <CheckIn path="/checkin/:userID/:meetingID" />
                
                <SignUp
                  path="/signup"
                  signupUser={this.signupUser}
                />

              </Router>
            
            </main>
        </Layout>         
      </div>
    );
  }
}

export default App;

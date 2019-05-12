import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import AttendeesList from './AttendeesList/AttendeesList';
import { FaUndo, FaRandom } from 'react-icons/fa';

import classes from './Attendees.module.css';

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      allAttendees: [],
      displayAttendees: []
    };

    
  }

  componentDidMount() {

    const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on('value', snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
      }
    
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList
      });
    
    });
  }

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  chooseRandom = () => {
    
    const randomAttendee = Math.floor( Math.random() * this.state.allAttendees.length );
    
    this.resetQuery();
    
    this.setState({ displayAttendees: [this.state.allAttendees[randomAttendee]] });
  
  }

  resetQuery = () => {
    this.setState({ displayAttendees: this.state.allAttendees, searchQuery: '' });
  }

  render() {

    const dataFilter = item =>
      item.attendeeName
          .toLowerCase()
          .match( this.state.searchQuery.toLowerCase() ) && true;
   
    const filteredAttendees = this.state.displayAttendees.filter( dataFilter );

    return (
      
      <div className={classes.container}>
        
        <h1 className="mb-5 text-center" style={{color: '#fff'}}>  Attendees </h1>

        <div className="row">
        
          <div className="col-md-6">
        
            <div className={classes.bodySection}>

                <div className="input-group input-group-lg">
                
                  <input
                    type="text"
                    name="searchQuery"
                    style={{backgroundColor: 'transparent', color: '#fff'}}
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    className="form-control"
                    onChange={this.handleChange}
                  />
            
                  <div className="input-group-append">
            
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Pick a random attendee"
                      onClick={() => this.chooseRandom()}
                    >
                      <FaRandom />
            
                    </button>
            
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Reset Search"
                      onClick={() => this.resetQuery()}
                    >
            
                      <FaUndo />
            
                    </button>
            
                  </div>
            
                </div>
            
            </div>
        
          </div>
   
          <div className="col offset-md-1 col-md-5">

              <AttendeesList
                userID={this.props.userID}
                meetingID={this.props.meetingID}
                adminUser={this.props.adminUser}
                attendees={filteredAttendees}
              />

          </div>
        
        </div>
      
      </div>
    );
  }
}

export default Attendees;
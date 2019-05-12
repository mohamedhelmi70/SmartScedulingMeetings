import React, { Component } from 'react';
import firebase from '../../../Firebase/Firebase';
import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';
import { navigate } from '@reach/router';

class MeetingsList extends Component {

  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    const ref = firebase.database().ref(`meeting-5050/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  };

  render() {

    const { meetings } = this.props;
    
    const myMeetings = meetings.map(item => {
    
      return (
    
        <div 
          className="list-group-item d-flex" 
          key={item.meetingID}
          style={{backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: 'none', borderRight: 'none'}}
        >
          
          <section
            className="btn-group align-self-center" role="group" aria-label="Meeting Options"
          >
 
            <button
              className="btn btn-sm btn-outline-danger"
              title="Delete Meeting"
              onClick={e => this.deleteMeeting(e, item.meetingID)}
            >
 
              <GoTrashcan />
 
            </button>
            
            <button
              className="btn btn-sm btn-outline-warning"
              title="Check In"
              onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}
            >

              <FaLink />
            
            </button>

            <button
              className="btn btn-sm btn-outline-primary"
              title="Attendees List"
              onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}
            >
            
              <GoListUnordered />
            
            </button>
          
          </section>

          <section className="pl-4 text-left align-self-center">
          
            {item.meetingName}
          
          </section>
        
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingsList;

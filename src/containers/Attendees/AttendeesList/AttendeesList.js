import React, { Component } from 'react';
import { GoTrashcan, GoMail, GoStar } from 'react-icons/go';
import firebase from '../../../Firebase/Firebase';
import classes from './AttendeesList.module.css';

class AttendeesList extends Component {

  deleteAttendee = (e , whichMeeting, whichAttendee) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
    ref.remove();
  };

  toggleStar = (e, star, whichMeeting, whichAttendee) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/star`);

    if (star === undefined) {
      ref.set(true);
    } else {
      ref.set(!star);
    }
  };

  render() {
    
    const admin = this.props.adminUser === this.props.userID ? true : false;
    
    const attendees = this.props.attendees;
    
    const myAttendees = attendees.map( item => {
    
      return (
        <div className="col col-sm-6 col-md-6 px-1" key={item.attendeeID} >
          
          <div className={classes.bodySection}>
          
            <div className={' px-3 py-2 d-flex align-items-left ' + (admin ? '' : 'justify-content-center') } >
              
              {admin && (
                
                <div className="btn-group pr-2">
                  
                  <button
                    className={ 'btn btn-sm ' + (item.star ? 'btn-warning' : 'btn-outline-secondary') }
                    tite="Give user a star"
                    onClick={ e => this.toggleStar( e, item.star, this.props.meetingID, item.attendeeID ) }
                  >
                   
                    <GoStar />

                  </button>
                  
                  <a
                    href={`mailto:${item.attendeeEmail}`}
                    className="btn btn-sm btn-outline-secondary"
                    title="Mail Attendee"
                  >
                    <GoMail />
                  
                  </a>
                  
                  <button
                    className="btn btn-sm btn-outline-danger"
                    tite="Delete Attendee"
                    onClick={e => this.deleteAttendee( e, this.props.meetingID, item.attendeeID)}
                  >

                    <GoTrashcan />
                  
                  </button>
               
                </div>
              )}

              <div className={classes.attendeeName}> { item.attendeeName } </div>

            </div>
          
          </div>
        
        </div>
      );
    });

    return <div>{myAttendees}</div>;
  }
}

export default AttendeesList;

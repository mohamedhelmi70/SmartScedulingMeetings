import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import { navigate } from '@reach/router';
import classes from './CheckIn.module.css';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: ''
    };
  }

  handleChange =  e => {

    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit = e => {

    e.preventDefault();

    const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    ref.push({ attendeeName: this.state.displayName, attendeeEmail: this.state.email, star: false});
    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);

  }

  render() {
    return (
      
      <form className="mt-2" onSubmit={this.handleSubmit}>

        <div className="container">
      
          <div className="row justify-content-center">
      
            <div className="col-lg-6">
      
              <div className={classes.bodySection}>
                 
                  <h3 className="mb-3" style={{color: '#fff'}}>Check In</h3>
                 
                  <section className="form-group">
   
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Name
                    </label>
   
                    <input
                      required
                      className="form-control"
                      style={{backgroundColor: 'transparent', color: '#fff'}}
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Name"
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
   
                  </section>
   
                  <section className="form-group">
   
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
   
                    <input
                      required
                      className="form-control"
                      style={{backgroundColor: 'transparent', color: '#fff'}}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
   
                  </section>
   
                  <div className="form-group text-right mb-0">
                    
                    <button className="btn btn-warning" type="submit">
                      Check in
                    </button>
            
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CheckIn;

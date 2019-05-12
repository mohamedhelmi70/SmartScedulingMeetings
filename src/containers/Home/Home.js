import React, { Component } from 'react';
import { Link } from '@reach/router';
import classes from './Home.module.css';

class Home extends Component {
  
  render() {
 
    const { user } = this.props;

    return (
      <div className={classes.container}>          
 
            <div
              className="display-4 text-primary mt-3 mb-2"
              style={{ fontSize: 2.8 + 'em' }}
            >
              Smart Scheduling For Meetings
            </div>
            
            <p className={classes.lead}>
              Create meetings.
            </p>
            
            <p className={classes.lead}>
              Allows people to check In 
            </p>
            
            <p className={classes.lead}>
              Picks random users to award giveaways.
            </p>

            {user === null && (
              <span>
                <Link to="/signup" className="btn btn-outline-warning mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-outline-warning mr-2">
                  Log In
                </Link>
              </span>
            )}
        
            { user && (
              <Link to="/meetings" className="btn btn-warning">
                Meetings
              </Link>
            ) }
        
      </div>
    );
  }
}

export default Home;
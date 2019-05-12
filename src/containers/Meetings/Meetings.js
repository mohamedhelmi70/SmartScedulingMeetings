import React, { Component } from 'react';
import MeetingsList from './MeetingList/MeetingsList';
import classes from './Meetings.module.css';

class Meetings extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      meetingName: ''
    };
  }

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit = e =>  {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: '' });
  }

  render() {
    return (
      
      <div className={classes.container}>
          
          <div className="row">
              
              <div className="col col-md-6">
                 
              <h1 className={classes.heading}>Add Meeting</h1>
                
                <div  className={classes.bodySection}>    
  
                      <form className="formgroup" onSubmit={this.handleSubmit}>
  
                        <div className="input-group input-group-lg">
                          
                          <input
                            type="text"
                            className="form-control"
                            style={{backgroundColor: 'transparent', color: '#fff'}}
                            name="meetingName"
                            placeholder="Meeting name"
                            aria-describedby="buttonAdd"
                            value={this.state.meetingName}
                            onChange={this.handleChange}
                          />
  
                          <div className="input-group-append">
                          
                            <button
                              type="submit"
                              className="btn btn-sm btn-info"
                              id="buttonAdd"
                            >
                              +
                            </button>
                          
                          </div>
                        
                        </div>
                      
                    </form>
                  
                </div>
                  

              </div>

              <div className="col offset-md-1 col-md-5">
              
                <div className="card border-top-0 rounded-0" style={{backgroundColor: 'transparent'}}>
                
                  {this.props.meetings && this.props.meetings.length ? (
                
                      <div className="card-body" style={{padding: '10px'}}>

                        <h4 className="card-title" style={{ color: '#ffc107'}}> My Meetings </h4>

                      </div>

                  ) : null}

                  { this.props.meetings && (
                    
                    <div className="list-group list-group-flush">
                      
                      <MeetingsList userID={this.props.userID} meetings={this.props.meetings} />
                    
                    </div>
                  
                  )}
                </div>
              
            </div>
                
        </div>    
      </div>
    
    );
  
  }

}

export default Meetings;
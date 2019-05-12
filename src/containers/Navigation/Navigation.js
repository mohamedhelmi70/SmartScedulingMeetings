import React, { Component } from 'react';
import { Link } from '@reach/router';

class Navigation extends Component {
  
  render() {
    
    const { user, logOutUser } = this.props;

    return (
     
     <nav className="site-nav family-sans navbar navbar-expand navbar-dark bg-dark higher">
        
        <div   className="container-fluid" style={{margin: '0 150px'}} >

          <Link to="/" className="navbar-brand">

            <h3 style={{fontFamily: 'Helvetica, sans-serif', color: '#ffc107'}}>Meeting</h3> 
          
          </Link>
          
          <div className="navbar-nav ml-auto">

            {user && ( <Link className="nav-item nav-link" to="/meetings"> Meetings </Link> )}
          
            {!user && ( <Link className="nav-item nav-link" to="/login"> Log in </Link> )}

            {!user && ( <Link className="nav-item nav-link" to="/signup"> Sign Up </Link>  )}
            
            {user && ( <Link className="nav-item nav-link" to="/login" onClick={e => logOutUser(e)} > Log out </Link> )}
          
          </div>
                  
        </div>
      
      </nav>
    );
  }
}

export default Navigation;
import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import { navigate } from '@reach/router';
import classes from './Login.module.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    };

  }

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit = e => {
    
    let registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };
    
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => { navigate('/meetings'); })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }

  render() {
    return (

      <div className={classes.container}>
        
        <h3>Welcome to</h3>
        
        <p>Meeting</p> 
        
        <form className="mt-3" onSubmit={this.handleSubmit}>
          
          { this.state.errorMessage !== null ? ( <ErrorMessage Message={this.state.errorMessage} /> ) : null }

          <section className="form-group">
        
            <label className="form-control-label sr-only" htmlFor="Email" > Email </label>
        
            <input
              required
              className="form-control"
              style={{color: '#fff', backgroundColor: 'transparent'}}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </section>
        
          <section className="form-group">
            
            <input
              required
              className="form-control"
              style={{color: '#fff', backgroundColor: 'transparent'}}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            
          </section>
        
          <div className="form-group text-right mb-0">
           
            <button 
              type="submit" 
              className="btn btn-outline-warning"
              style={{float: 'left'}}
            >Log In</button>
          
          </div>
                 
        </form>
     
      </div>
    );
  }
}

export default Login;
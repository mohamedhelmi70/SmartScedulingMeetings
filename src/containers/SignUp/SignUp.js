import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import classes from './SignUp.module.css';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      passOne: '',
      passTwo: '',
      errorMessage: null
    };
    
  }

  handleChange = e => {
   
    const itemName = e.target.name;
   
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: 'Passwords no not match' });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit = e => {
    
    let registrationInfo = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.passOne
    };

    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.signupUser( registrationInfo.name );
      })
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
                
          <div className="form-row">
          
            { this.state.errorMessage !== null ? ( <ErrorMessage Message={this.state.errorMessage} /> ) : null}

            <section className="col-sm-12 form-group">
              
              <label className="form-control-label sr-only" htmlFor="name"> Name </label>
            
              <input
                className="form-control"
                style={{color: '#fff', backgroundColor: 'transparent'}}
                type="text"
                id="name"
                placeholder="Name"
                name="displayName"
                required
                value={this.state.displayName}
                onChange={this.handleChange}
              />
            
            </section>

          </div>

          <section className="form-group">
            
            <label className="form-control-label sr-only" htmlFor="email"> Email </label>
            
            <input
              className="form-control"
              style={{color: '#fff', backgroundColor: 'transparent'}}
              type="email"
              id="email"
              placeholder="Email"
              required
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

          </section>
          
          <div className="form-row">
          
            <section className="col-sm-6 form-group">
              
              <input
                className="form-control"
                style={{color: '#fff', backgroundColor: 'transparent'}}
                type="password"
                name="passOne"
                placeholder="Password"
                value={this.state.passOne}
                onChange={this.handleChange}
              />
            
            </section>
            
            <section className="col-sm-6 form-group">
           
              <input
                className="form-control"
                style={{color: '#fff', backgroundColor: 'transparent'}}
                type="password"
                required
                name="passTwo"
                placeholder="Confirm Password"
                value={this.state.passTwo}
                onChange={this.handleChange}
              />
           
            </section>
          
          </div>

          <div className="form-group text-right mb-0">
            
            <button 
              type="submit" 
              className="btn btn-outline-warning"
              style={{float: 'left'}}
            >Sign Up</button>
          
          </div>

        </form>

      </div>  
    );
  }
}

export default SignUp;

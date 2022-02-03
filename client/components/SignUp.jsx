import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
  failedAuthStatement: state.user.failedAuthStatement
})
const mapDispatchToProps = (dispatch) => ({
    changePage: (payload) => dispatch(actions.changePage(payload)),
    createAccount: (username, password, displayName, location) => {
      dispatch(actions.createAccount(username, password, displayName, location));
    },
    login: (username, password, cookieAuth) => dispatch(actions.login(username, password, cookieAuth))
  });

const SignUp = (props) => {
  const handleClick = (e) => {
    e.preventDefault();

    const username = document.querySelector('input[name="signUpUserName"]').value,
      password = document.querySelector('input[name="signUpPassword"]').value,
      displayName = document.querySelector('input[name="displayName"]').value,
      location = document.querySelector('input[name="signUpLocation"]').value;
    
    props.createAccount(username, password, displayName, location);
  }

  return (
    <div className="auth">
      <br/>
      <h1>create your frollic account</h1>
      <div id="loginPageContainer">
        <p>Username</p>
        <input type="text" name="signUpUserName" placeholder="Input a username"></input>
        <p>Password</p>
        <input type="password" name="signUpPassword" placeholder="Input a password"></input>
        <p>Display Name</p>
        <input type="text" name="displayName" placeholder="John Doe"></input>
        <p>Zipcode</p>
        <input type="text" name="signUpLocation" placeholder="77705"></input>

        <button id="loginButton" onClick={handleClick}>Sign Up</button>
        <p className='center'>{props.failedAuthStatement}</p>
        <button id="returnHome" onClick={() => props.changePage('loginSignup')}>Return Home</button>
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
    changePage: payload => dispatch(actions.changePage(payload)),
    login: (username, password, cookieAuth) => dispatch(actions.login(username, password, cookieAuth))
  });

const LoginSignupDisplay = (props) => {
    useEffect(() => {
        console.log('Checking session');
        props.login('cookieEvaluation', '-', true);
      }, [])
      
  return (
    <div className="auth">
      <br/>
      <h1>welcome to frollic!</h1>
      <div id="loginPageContainer">
        <div id="welcomeText">frollic is a tool to help you find food, fun and more at venues that can meet your needs. 
        Find out more by logging in or creating an account below!</div>
        <br/><br/>
        <button id="loginButton" onClick={() => props.changePage('login')}>Click here to Log In</button>
        <br/><br/><br/><br/>
        <div id="welcomeText">Or, if you're new here, create an account below to get started!</div>
        <button id="createAccountButton" onClick={() => props.changePage('signUp')}>Click here to Create a New Account</button>
        <br/>
      </div>
    </div>
  )
}
export default connect(null, mapDispatchToProps)(LoginSignupDisplay);
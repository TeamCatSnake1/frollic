import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateTopProps = state => ({
  failedAuthStatement: state.user.failedAuthStatement
})

const mapDispatchToProps = (dispatch) => ({
    changePage: payload => dispatch(actions.changePage(payload)),
    login: (username, password) => dispatch(actions.login(username, password))
  });

const Login = (props) => {
  const handleClick = (e) => {
    e.preventDefault();

    const username = document.querySelector('input[name="loginUpUserName"]').value,
      password = document.querySelector('input[name="loginUpPassword"]').value;
    
    props.login(username, password);
  }

  return (
    <div className="auth">
      <br/>
      <h1>log in to frollic</h1>

    <div id="loginPageContainer">
      <p>Username</p>
      <input type="text" name="loginUpUserName" placeholder="Input your Username"></input>
      <p>Password</p>
      <input type="password" name="loginUpPassword" type="password" placeholder="Input your Password"></input>
      
      <button id="loginButton" onClick={handleClick}>Login</button>
      <p className='center'>{props.failedAuthStatement}</p>
      <br/>
      <button id="returnHome" onClick={() => props.changePage('loginSignup')}>Return Home</button>
      </div>
    </div>
  )
}
export default connect(mapStateTopProps, mapDispatchToProps)(Login);
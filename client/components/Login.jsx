import React from 'react';
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
      <h1>Login</h1>
      <button onClick={() => props.changePage('signUp')}>Need an account?</button>

      <p>Username</p>
      <input type="text" name="loginUpUserName" placeholder="username1234"></input>
      <p>Password</p>
      <input type="password" name="loginUpPassword" placeholder="super secure 85"></input>
      
      <button onClick={handleClick}>Login</button>
      <p className='center'>{props.failedAuthStatement}</p>
    </div>
  )
}
export default connect(mapStateTopProps, mapDispatchToProps)(Login);
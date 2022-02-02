import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
    changePage: (payload) => dispatch(actions.changePage(payload))
  });

const Login = (props) => {
  return (
    <div className="auth">
      <br/>
      <h1>Login</h1>
      <button onClick={() => props.changePage('signUp')}>Need an account?</button>
      <p>Username</p>
      <input type="text" name="username" placeholder="username1234"></input>
      <p>Password</p>
      <input type="password" name="password" placeholder="extra super secure 24"></input>
      
      <button onClick={() => props.changePage('signUp')}>Login</button>
    </div>
  )
}
export default connect(null, mapDispatchToProps)(Login);
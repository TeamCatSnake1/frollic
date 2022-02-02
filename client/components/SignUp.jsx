import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
    changePage: (payload) => dispatch(actions.changePage(payload))
  });

const SignUp = (props) => {
  return (
    <div className="auth">
      <br/>
      <h1>Sign Up</h1>
      <button onClick={() => props.changePage('login')}>Already have an account?</button>
      <p>Username</p>
      <input type="text" name="username" placeholder="username1234"></input>
      <p>Password</p>
      <input type="password" name="password" placeholder="super secure 85"></input>
      <p>Display Name</p>
      <input type="text" name="displayName" placeholder="John Doe"></input>
      <p>Zipcode</p>
      <input type="text" name="zipCode" placeholder="77705"></input>
      
      <button onClick={() => props.changePage('login')}>Sign Up</button>
    </div>
  )
}
export default connect(null, mapDispatchToProps)(SignUp);
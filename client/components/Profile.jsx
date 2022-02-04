import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  username: state.user.username,
  displayName: state.user.displayName,
  location: state.user.location
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

const Profile = props => {
  const handleClick = () => {
    props.logout();
  }

  return (
    <div className="auth">
      <br/>
      <h1>Profile</h1>
      <div className="profile">
        <h3 id='uNP'>Username: {props.username}</h3>
        <h3 id='dNP'>Display Name: {props.displayName}</h3>
        <h3 id='dZP'>Default Zipcode: {props.location}</h3>
        <button id="loginButton" onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
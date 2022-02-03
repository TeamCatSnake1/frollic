import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

const Profile = props => {
  const handleClick = () => {
    props.logout
  }

  return (
    <div className="auth">
      <br/>
      <h1>Profile</h1>
      <button id="search" onClick={handleClick}>Logout</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Profile);
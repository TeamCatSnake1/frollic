import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
  currPage: state.search.page
})

const mapDispatchToProps = dispatch => ({
  changePage: (payload) => dispatch(actions.changePage(payload)),
  logout: () => dispatch(actions.logout())
});

const Navbar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (props.currPage === 'main') props.changePage('profile');
    else if (props.currPage === 'profile') props.changePage('main');
    else (props.logout());
  }

  return (
  <div id="nav">
    <a href="/"><img id="logo" alt="frollic-logo" src="/assets/logo.png"></img></a>
    <div id="profile-container">
      <button id="profile-icon" onClick={handleClick}>
          <img src="https://img.icons8.com/small/32/000000/gender-neutral-user.png"/>
      </button>
    </div>
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
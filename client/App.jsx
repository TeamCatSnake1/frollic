import React from 'react';
import { connect } from 'react-redux';

import SignUp from './components/SignUp.jsx';
import Navbar from './components/Navbar.jsx';
import MainContainer from './components/MainContainer.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import * as actions from './actions/actions.js';

const mapStateToProps = (state) => ({
  page: state.search.page
})

const mapDispatchToProps = dispatch => ({
  changePage: (pl) => dispatch(actions.changePage(pl))
})

const App = (props) => {
  let currPage;

  if (props.page === 'signUp') currPage = <SignUp />;
  else if (props.page === 'login') currPage = <Login />;
  else if (props.page === 'main') currPage = <MainContainer />;
  else if (props.page === 'profile') currPage = <Profile />;
  else currPage = <h1>Invalid page please refresh</h1>;

  return (
    <section>
      <Navbar />
      {currPage}
      <button onClick={() => props.changePage('main')}>Dev skip to main page</button>
    </section>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
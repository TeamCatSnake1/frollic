import React from 'react';
import { connect } from 'react-redux';

import SignUp from './components/SignUp.jsx';
import Navbar from './components/Navbar.jsx';
import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx'

const mapStateToProps = (state) => ({
  page: state.search.page
})

const App = (props) => {
  let currPage;

  if (props.page === 'signUp') currPage = <SignUp />;
  else if (props.page === 'login') currPage = <Login />;
  else if (props.page === 'main') currPage = <MainContainer />;
  else currPage = <h1>Invalid page please refresh</h1>;

  return (
    <section>
      <Navbar />
      {currPage}
    </section>
  )
};

export default connect(mapStateToProps, null)(App);
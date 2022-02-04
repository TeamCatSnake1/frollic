import React from 'react';
import Sidebar from './Sidebar.jsx';
import ResultsContainer from './ResultsContainer.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  username: state.user.username,
  displayName: state.user.displayName,
  location: state.user.location
})

const MainContainer = (props) => {
  return (
    <section id="main-container">
      <Sidebar/>
      <ResultsContainer/>
    </section>
  )
}
export default connect(mapStateToProps, null)(MainContainer);
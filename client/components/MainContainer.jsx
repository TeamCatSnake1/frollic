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
      <h1>{`Hello ${props.displayName} signed in as ${props.username} at ${props.location}`}</h1>
    </section>
  )
}
export default connect(mapStateToProps, null)(MainContainer);
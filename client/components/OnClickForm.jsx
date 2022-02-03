import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  accomTypes: state.user.accomTypes
})

const mapDispatchToProps = dispatch => ({
  addAccommodation: (venueId, accommodation, accomType) => dispatch(actions.addAccommodation(venueId, accommodation, accomType))
})

const OnClickForm = props => {
  const handleClick = (e) => {
    e.preventDefault();

    const accommodation = window.prompt('Please enter the accommodation you would like to submit: ');
    accomType = document.querySelector(`select[name="${props.venueId}"]`).value;

    props.addAccommodation(props.venueId, accommodation, accomType)
  }

  const getTypes = () => {
    return props.accomTypes.map(type => <option key={type} name={type}>{type}</option>)
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="radius" className="side-header">Select Type</label><br/>
      <select name={props.venueId}>
        {getTypes()}
      </select><br/>
      <button className="addFav" onClick={handleClick}>Submit new Accommodation</button>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OnClickForm)
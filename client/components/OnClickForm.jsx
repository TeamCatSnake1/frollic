import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  accomTypes: state.user.accomTypes
})

const mapDispatchToProps = dispatch => ({
  addAccommodation: (venueId, accommodation, accomType, venueName) => dispatch(actions.addAccommodation(venueId, accommodation, accomType, venueName))
})

const OnClickForm = props => {
  const selector = React.createRef()

  const handleClick = (e) => {
    e.preventDefault();
    const accomType = selector.current.value;
    const accommodation = [];

    
    accommodation.push(window.prompt('Please enter the accommodation you would like to submit: '));

    props.addAccommodation(props.venueId, accommodation, accomType, props.venueName)
  }

  const getTypes = () => {
    return props.accomTypes.map(type => <option key={type} name={type}>{type}</option>)
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="radius" className="side-header">Select Type</label><br/>
      <select name={props.venueId} ref={selector}>
        {getTypes()}
      </select><br/>
      <button className="addFav" onClick={handleClick}>Choose Accommodations</button>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OnClickForm)
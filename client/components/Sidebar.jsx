import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateTopProps = state => ({
  accommodationsArray: state.user.accommodations,
  defaultLocation: state.user.location,
})

const mapDispatchToProps = (dispatch) => ({
  getResults: (location, radius, categories, accommodations, defaultLocation) => {
    dispatch(actions.getResults(location, radius, categories, accommodations, defaultLocation));
  }
});

const Sidebar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    const location = document.querySelector('input[name="location"]').value;
    const radius = document.querySelector('select[name="radius"]').value;
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    const defaultLocation = props.defaultLocation;

    let categories = '';
    const accommodations = [];
    checkboxes.forEach((el) => {
      if (el.className === 'locType') categories += ',' + el.name
      else if (el.className === 'accType') accommodations.push(el.name)
    });
    categories = categories.slice(1);

    props.getResults(location, radius, categories, accommodations, defaultLocation);
  }

  const buildAccommodationsBoxes = () => {
    const output = [];
    props.accommodationsArray.forEach((accom, ind) => {
      output.push(<div className="checkbox" key={`aCB${ind}`}>
        <input type="checkbox" name={accom} className="accType"></input>
        <label>{accom}</label><br/>
      </div>)
    })

    return output;
  }


  return (
    <aside>
      <form>
        <div className="location-and-radius">
        <div className="form-element">
        <label htmlFor="location" className="side-header">Your Address or Zipcode</label><br/>
        <input type="text" name="location" placeholder="eg. 123 Main Street, New York, NY, 10036 or 90210"></input><br/>
        </div>
        
        <div className="form-element">
        <label htmlFor="radius" className="side-header">Search Radius</label><br/>
        <select name="radius">
          <option value=".5">less than 1 mile</option>
          <option value="1">1 mile</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
        </select><br/>
        </div>
        </div>

        <div className="filters">
          <p className="side-header">What type of locations are you looking for?</p>
          <div className="checkboxes">
            <div className="checkbox">
            <input type="checkbox" name="galleries" className="locType"></input>
            <label htmlFor="Galleries">Art Galleries</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="bars" className="locType"></input>
            <label htmlFor="Bar" >Bar</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="coffee" className="locType"></input>
            <label htmlFor="Coffee &amp; Tea">Coffee &amp; Tea</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="desserts" className="locType"></input>
            <label htmlFor="Desserts">Desserts</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="restaurants" className="locType"></input>
            <label htmlFor="Restaurants">Restaurants</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="movietheaters" className="locType"></input>
            <label htmlFor="Cinema">Cinema</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="musicvenues" className="locType"></input>
            <label htmlFor="Music Venues">Music Venues</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="shopping" className="locType"></input>
            <label htmlFor="Shopping">Shopping</label><br/>
            </div>

          </div>
          <p className="side-header">What type of accommodations are you looking for?</p>
          <div className="checkboxes">
            {buildAccommodationsBoxes()}
          </div>

        </div>
        <button id="search" onClick={handleClick}>Search</button>

      </form>
    </aside>
  )
};

export default connect(mapStateTopProps, mapDispatchToProps)(Sidebar);
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import OnClickForm from './OnClickForm.jsx';

const ResultCard = (props) => {
  const spreadAccommodations = () => {
    if (props.accommodations === undefined || props.accommodations.length === 0) return 'No currently listed accommodations.'

    return props.accommodations.reduce((acc, curr) => {
      acc += ' ' + curr;
    }, '');
  }

  const showForm = () => {
    return (
      <div> 
     <form id= "add-app">
 
          <label>Application Name : </label>
          <input type="text"> </input>
 
          <label> id : </label>
          <input type="text" ></input>
 
          <label>Server details : </label>
          <input ></input>
 
          <button>Create</button>
       </form>
       </div>
      );
  }
  
  return (
    <article>
      <div className="business">
        <img className="businessImg"src={props.image}></img>
        <div className="businessDetails">
          <p className="distance">{props.distance}</p>
          <p><a className="name" href={props.url}>{props.name}</a></p>
          <p><span className="price">{props.price}</span><span>&#8226;</span><span className="rating">Rating: {props.rating}</span></p>
          <p className="Address">{props.address}</p>
          <p className="phone">{props.phone}</p>
          <p className='accommodations'>{`Accomodations: ${spreadAccommodations()}`}</p>
          <button className="add-comment">Show Comments</button>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="addFav" onClick={() => props.addFav(props.result)}>Favorite</button>
        <button className="comment" onClick={props.addComment}>Comment</button>
        <CopyToClipboard text={props.url}>
          <button className="share" onClick={(e) => {e.target.innerText = 'Copied!'; setTimeout(() => {e.target.innerText = 'Share'}, 1000) }}>Share</button>
        </CopyToClipboard>
        <OnClickForm venueId={props.venueId} />
      </div>
    </article>
  );
}

export default ResultCard;
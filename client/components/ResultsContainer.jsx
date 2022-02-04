import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard.jsx'
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  imperfectResults: state.search.imperfectResults,
  firstRender: state.search.firstRender,
  displayName: state.user.displayName
});

const mapDispatchToProps = (dispatch) => ({
  addFav: (favorite) => {
    dispatch(actions.addFav(favorite));
  },
  addComment: (comment) => {
    dispatch(actions.addComment(comment));
  }
});

const ResultsContainer = (props) => {
  if (!props.searchResults.length && !props.firstRender && !props.imperfectResults.length) {
    return (
      <section id="splash">
        <h2>Sorry, no results found matching your query. <br/>Try expanding your search radius.</h2>
      </section>
    )
  } else if (!props.searchResults.length) {
    return (
      <section id="splash">
        <h1>Welcome {props.displayName}</h1>
      </section>
    )
  }

  const handleClick = () => {
    if (props.searchResults.length === 0) resultCards.pop()

    if (props.imperfectResults.length === 0) window.alert('Sorry no additional results.');
    else resultCards = buildCards(props.imperfectResults).concat(resultCards)
  }

  const buildCards = (venuesArray) => {
    return venuesArray.map((resultObj, index) => {
      return <ResultCard
        addFav={props.addFav}
        addComment={props.addComment}
        key={index}
        result={resultObj}
        name={resultObj.name}
        image={resultObj.image}
        url={resultObj.url}
        address={resultObj.address}
        phone={resultObj.phone}
        rating={resultObj.rating}
        price={resultObj.price}
        distance={resultObj.distance}
        accomodations={resultObj.accommodations}
        venueId={resultObj.id}
      />
    });
  }

  let resultCards = buildCards(props.searchResults)

  if (resultCards.length === 0) {
    resultCards.push(
      <section id="splash">
        <h2>Sorry, no results found matching your query. <br/>Try expanding your search radius.</h2>
      </section>
    )
  }
  
  return (
    <section id="results-container">
      <h3 id="result-word">Results: </h3>
      <button id='loadMore' onClick={handleClick}>Load more results</button>
      {resultCards}
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);
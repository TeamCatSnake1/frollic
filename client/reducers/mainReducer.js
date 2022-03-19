import * as types from '../constants/actionTypes';

const initialState = {
  searchResults: [],
  partialResults: [],
  noResults: [],
  favorites: [],
  savedResults: [],
  favsPageOn: false,
  firstRender: true,
  comments: [],
  page: 'loginSignup'
};

const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_ACCOMMODATIONS:
      searchResults = searchResults.map(venue => {
        if (venue.venueId === action.venueId) venue.accommodations.push(action.accommodation)
      })
      
      return {
        ...state,
        searchResults
      }

    case types.LOAD_MORE:
      let newDisplay = state.searchResults.concat(state.partialResults)
      let newPartials = state.noResults;
      return {
        ...state,
        searchResults: newDisplay,
        partialResults: newPartials,
        noResults: [],
      }

    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }

    case types.GET_RESULTS:
      const partials = action.payload.partialMatches;
      let noResults = action.payload.noMatch;
      if (partials.length === 0 && noResults.length > 1){
        partials.concat(noResults);
        noResults = [];
      }

    return {
        ...state,
        firstRender: false,
        searchResults: action.payload.perfectMatches,
        partialResults: partials,
        noResults: noResults,
      }
    case types.ADD_FAV:
      const newFavs = state.favorites.slice();

      if (!state.favorites.includes(action.payload)) newFavs.push(action.payload);
      
      return {
        ...state,
        favorites: newFavs,
      }
    case types.TOGGLE_FAVS_PAGE:
      if (!state.favsPageOn) {

        return {
          ...state,
          savedResults: state.searchResults,
          searchResults: state.favorites,
          favsPageOn: true,
        }
      }
      return {
        ...state,
        searchResults: state.savedResults,
        saveResults: [],
        favsPageOn: false,
      }
    case types.ADD_COMMENT:
      const newComments = state.comments.slice();
      newComments.push(action.payload);

      return {
        ...state,
        comments: newComments,
      }
    case types.TOGGLE_COMMENTS:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default mainReducer;
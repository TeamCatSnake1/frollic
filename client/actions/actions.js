import * as types from '../constants/actionTypes';
import axios from 'axios';

export const addAccommodation = (venueId, accommodation, accomType) => dispatch => {
  axios({
    method: 'POST',
    url: `/api/add`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      venueId: venueId,
      accomodation: accommodation
    }
  })
  .then((response) => {
    if (response.valid) {
      dispatch({
        type: types.ADD_ACCOMMODATIONS,
        payload: {
          venueId: venueId,
          accommodation: accommodation,
          accomType: accomType
        }
      });
    }
    else window.alert(`Submittal of ${accommodation} failed please try again later.`)
  });
};

export const getResults = (location, radius, categories, accommodations) => (dispatch) => {
  axios({
    method: 'POST',
    url: `/api/search`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      // accomodations: []
      location: location,
      radius: radius,
      categories: categories,
      accommodations: accommodations
    }
  })
  .then((response) => {
    console.log(response.data)
    dispatch({
      type: types.GET_RESULTS,
      payload: response.data,
    });
  });
};

export const createAccount = (username, password, displayName, location) => dispatch => {
  console.log('username', username, 'password', password, 'display name', displayName, 'location', location)
  if (!username || !password || !displayName || !location) return dispatch({ type: types.UNSUCCESSFUL_AUTH})
  else {
    axios({
      method: 'POST',
      url: `/authentication/signUp`,
      headers: { 'Content-Type': 'application/JSON' },
      data: {
        username: username,
        password: password,
        defaultLocation: location,
        displayName: displayName
      }
    })
    .then((res) => {
      dispatch({
        type: types.SUCCESSFUL_AUTH,
        payload: { username: res.data.username, displayName: res.data.displayName, location: res.data.defaultLocation, accommodations: res.data.accommodations }
      })
      dispatch(changePage('main'));
    }).catch((err) => {
      console.log(err);
      dispatch({ type: types.UNSUCCESSFUL_AUTH });
    })
  }
}

export const login = (username, password) => dispatch => {
  if (!username || !password) return dispatch({ type: types.UNSUCCESSFUL_AUTH })
  else {
    axios({
      method: 'POST',
      url: `/authentication/login`,
      headers: { 'Content-Type': 'application/JSON' },
      data: {
        username: username,
        password: password
      }
    })
    .then((res) => {
      dispatch({
        type: types.SUCCESSFUL_AUTH,
        payload: { username: res.data.username, displayName: res.data.displayName, location: res.data.defaultLocation, accommodations: res.data.accommodations }
      })
      dispatch(changePage('main'));
    }).catch((err) => {
      console.log(err);
      dispatch({ type: types.UNSUCCESSFUL_AUTH });
    })
  }
}

export const addFav = (favorite) => ({
  type: types.ADD_FAV,
  payload: favorite,
});

export const toggleFavsPage = () => ({
  type: types.TOGGLE_FAVS_PAGE,
});

export const addComment = (number, comment) => ({
  type: types.ADD_COMMENT,
  payload: { number, comment }
});

export const toggleComments = () => ({
  type: types.TOGGLE_COMMENTS,
});

export const changePage = (newPage) => ({
  type: types.CHANGE_PAGE,
  payload: newPage
})
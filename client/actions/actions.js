import * as types from '../constants/actionTypes';
import axios from 'axios';

export const logout = () => dispatch => {
  axios({
    method: 'POST',
    url: `/authentication/logout`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {}
  })
  .then((response) => {
    if (response.data.valid) {
      dispatch({
        type: types.CHANGE_PAGE,
        payload: 'loginSignup'
      });
    }
    else window.alert('Failed to logout. Please try again or wait for your session to expire.');
  }).catch(err => {
    console.log(err);
    window.alert('Failed to logout. Please try again or wait for your session to expire.');
  })
}

export const addAccommodation = (venueId, accommodation, accomType, venueName) => dispatch => {
  console.log(venueName)
  axios({
    method: 'POST',
    url: `/api/add`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      venueId: venueId,
      accommodation: accommodation,
      accomType: accomType,
      venueName: venueName
    }
  })
  .then((response) => {
    if (response.valid) {
      dispatch({
        type: types.ADD_ACCOMMODATIONS,
        payload: {
          venueId: venueId,
          accommodation: accommodation,
          accomType: accomType,
          venueName: venueName
        }
      });
    }
    else window.alert(`Submittal of ${accommodation} failed please try again later.`)
  });
};

export const getResults = (location, radius, categories, accommodations, defaultLocation) => (dispatch) => {
  axios({
    method: 'POST',
    url: `/api/search`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      location: location,
      radius: radius,
      categories: categories,
      accommodations: accommodations,
      defaultLocation: defaultLocation,
    }
  })
  .then((response) => {
    dispatch({
      type: types.GET_RESULTS,
      payload: response.data,
    });
  });
};

export const createAccount = (username, password, displayName, location) => dispatch => {
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

export const login = (username, password, cookieAuth = false) => dispatch => {
  if (!username || !password) return dispatch({ type: types.UNSUCCESSFUL_AUTH})
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
      if (!res.data.valid) return dispatch({type: types.UNSUCCESSFUL_AUTH})
      dispatch({
        type: types.SUCCESSFUL_AUTH,
        payload: { username: res.data.username, displayName: res.data.displayName, location: res.data.defaultLocation, accommodations: res.data.accommodations }
      })
      dispatch(changePage('main'));
    }).catch((err) => {
      if (cookieAuth) return;
      else {
        console.log(err);
        dispatch({ type: types.UNSUCCESSFUL_AUTH });
      }
    })
  }
}

export const addFav = (favorite) => ({
  type: types.ADD_FAV,
  payload: favorite,
});

export const loadMore = () => ({
  type: types.LOAD_MORE,
})

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
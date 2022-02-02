import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getResults = (location, radius, categories, accommodations) => (dispatch) => {
  console.log(accommodations)


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
    dispatch({
      type: types.SUCCESSFUL_AUTH,
      payload: { username: username, displayName: displayName, location: location }
    })
    dispatch(changePage('main'));
  }
  // axios({
  //   method: 'POST',
  //   url: `/authentication`,
  //   headers: { 'Content-Type': 'application/JSON' },
  //   data: {
  //     username: username,
  //     password: password,
  //     location: location,
  //     displayName: displayName
  //   }
  // })
  // .then((response) => {
  //   console.log(response.data)
  //   dispatch({
  //     type: types.CREATE_ACCOUNT,
  //     payload: response.data,
  //   });
  // });
}

export const login = (username, password) => dispatch => {
  if (!username || !password) return dispatch({ type: types.UNSUCCESSFUL_AUTH })
  else {
    dispatch({
      type: types.SUCCESSFUL_AUTH,
      payload: { username: username }// add stuff based off the readme when you pull down
    })
    dispatch(changePage('main'));
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
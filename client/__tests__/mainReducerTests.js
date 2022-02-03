import mainReducer from '../reducers/mainReducer';
import * as types from '../constants/actionTypes';


const initialState = {
  searchResults: [],
  favorites: [],
  savedResults: [],
  favsPageOn: false,
  firstRender: true,
  comments: [],
  page: 'signUp'
};

test('Should return initial state', () => {
  expect(mainReducer(undefined, '')).toEqual(initialState);
});

test('Should add an accommodation', () => {
  const action = { type: types.GET_RESULTS, payload: ['g2g'] };

  expect(mainReducer(initialState, action).searchResults).toEqual(['g2g']);
})

test('Should get results', () => {
  const action = { type: types.GET_RESULTS, payload: 'g2g' };

  expect(mainReducer(initialState, action).firstRender).toEqual(false);
  expect(mainReducer(initialState, action).searchResults).toEqual('g2g');
})

test('Should add unique favs only', () => {
  const action = { type: types.ADD_FAV, payload: 'g2g' };

  let currentState = mainReducer(initialState, action)
  expect(currentState.favorites).toEqual(['g2g']);
  currentState = mainReducer(currentState, action);
  expect(currentState.favorites).toEqual(['g2g']);
})

test('Should toggle favs page', () => {
  const action = { type: types.TOGGLE_FAVS_PAGE };

  let currentState = mainReducer(initialState, action);
  expect(currentState.favsPageOn).toEqual(true);
  currentState = mainReducer(currentState, action);
  expect(currentState.favsPageOn).toEqual(false);
})

test('Should add comment', () => {
  const action = { type: types.ADD_COMMENT, payload: 'Hello' };

  let currentState = mainReducer(initialState, action);
  expect(currentState.comments).toEqual(['Hello']);
  currentState = mainReducer(currentState, action);
  expect(currentState.comments).toEqual(['Hello', 'Hello']);
})
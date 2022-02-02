import * as actions from '../actions/actions'
import * as types from '../constants/actionTypes';

test('Should generate add fav action', () => {
  const action = actions.addFav('Test');

  expect(action.type).toEqual(types.ADD_FAV);
  expect(action.payload).toEqual('Test');
})

test('Should generate toggle favs page action', () => {
  const action = actions.toggleFavsPage('Test');
  
  expect(action.type).toEqual(types.TOGGLE_FAVS_PAGE);
  expect(action.payload).toEqual(undefined);
})

test('Should generate add comment action', () => {
  const action = actions.addComment(11, 'Test');
  
  expect(action.type).toEqual(types.ADD_COMMENT);
  expect(action.payload).toEqual({ number: 11, comment: 'Test'});
})

test('Should generate add fav action', () => {
  const action = actions.toggleComments('Test');
  
  expect(action.type).toEqual(types.TOGGLE_COMMENTS);
  expect(action.payload).toEqual(undefined);
})

test('Should generate add fav action', () => {
  const action = actions.addFav('Test');
  
  expect(action.type).toEqual(types.ADD_FAV);
  expect(action.payload).toEqual('Test');
})

test('Should submit a call to the back end that returns locations', () => {
  expect(typeof actions.getResults).toEqual('function');
})// Not much else to test with this one
import userReducer from '../reducers/userReducer';
import * as types from '../constants/actionTypes';


const initialState = {
  username: 'username',
  password: 'password',
  location: 'location',
  displayName: 'display name',
  accommodations: [],
  failedAuthStatement: '',
  accomTypes: ['Mobility', 'Vision', 'Hearing', 'Misc.']
}

test('mainReducer should return initial state', () => {
  expect(userReducer(undefined, '')).toEqual(initialState);
});

test('Should get results', () => {
  const action = { type: types.SUCCESSFUL_AUTH, payload: {
    username: 'me',
    location: 'here',
    displayName: 'you',
    accommodations: ['quiet'],
    failedAuthStatement: ''
  }};
  const newState = userReducer(initialState, action)

  expect(newState.username).toEqual('me');
  expect(newState.location).toEqual('here');
  expect(newState.displayName).toEqual('you');
  expect(newState.accommodations).toEqual(['quiet']);
  expect(newState.failedAuthStatement).toEqual('');
})

test('Should update state if auth is failed', () => {
  const action = { type: types.UNSUCCESSFUL_AUTH, payload: 'uh oh' }

  expect(userReducer(initialState, action).failedAuthStatement).toEqual('Authentication failed please try again.')
})
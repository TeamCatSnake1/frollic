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

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUCCESSFUL_AUTH:
      const { username, displayName, location, accommodations } = action.payload;

      return {
        ...state,
        username,
        location,
        displayName,
        accommodations,
        failedAuthStatement: ''
      }

    case types.UNSUCCESSFUL_AUTH:

      return {
        ...state,
        failedAuthStatement: 'Authentication failed please try again.'
      }

    default:
      return state;
  }
}

export default userReducer;
import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  search: mainReducer,
  user: userReducer
});

export default reducers;
import { combineReducers } from 'redux';
const initialState = {
  init: 'Hello World!'
};

const initialReducer = (state = initialState, action) => {
  return state;
};

export default combineReducers({ initialReducer });

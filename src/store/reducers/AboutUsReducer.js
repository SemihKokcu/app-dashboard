// reducer.js

import { CREATE_ABOUT_US, GET_ABOUT_US, UPDATE_ABOUT_US } from '../actions/AboutUsActions';

const initialState = {
  aboutUsData: null,
  loading: false,
  error: null, 
};

const aboutUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ABOUT_US:
      return {
        ...state,
        aboutUsData: action.payload,
        loading: false,
        error: null,
      };

    case GET_ABOUT_US:
      return {
        ...state,
        aboutUsData: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_ABOUT_US:
      return {
        ...state,
        aboutUsData: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default aboutUsReducer;

import {
    ROLE_ADD_SUCCESS_ACTION,
    ROLE_ADD_FAILED_ACTION,
    ROLE_LIST_SUCCESS_ACTION,
    ROLE_LIST_FAILED_ACTION,
    ROLE_UPDATE_SUCCESS_ACTION,
    ROLE_UPDATE_FAILED_ACTION,
    ROLE_DELETE_FAILED_ACTION,
    ROLE_DELETE_SUCCESS_ACTION,
  } from "../types/RoleTypes";
  
  const initialState = {
    role: {},
    roleList: [],
    errorMessage: "",
    pagination : {}
  };
  
  export function RoleReducer(state = initialState, action) {
    switch (action.type) {
      case ROLE_LIST_SUCCESS_ACTION:
        return {
          ...state,
          roleList: action.payload,
        };
      case ROLE_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case ROLE_ADD_SUCCESS_ACTION:
        return {
          ...state,
        };
      case ROLE_ADD_FAILED_ACTION:
        return {
          errorMessage: action.payload.error,
        };
      case ROLE_UPDATE_SUCCESS_ACTION:

        return {
          ...state,
        };
      case ROLE_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case ROLE_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case ROLE_DELETE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
  
      default:
        return {
          ...state,
        };
    }
  }
  
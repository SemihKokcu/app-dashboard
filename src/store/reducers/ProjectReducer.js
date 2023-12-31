import {
    PROJECT_ADD_SUCCESS_ACTION,
    PROJECT_ADD_FAILED_ACTION,
    PROJECT_LIST_SUCCESS_ACTION,
    PROJECT_LIST_FAILED_ACTION,
    PROJECT_UPDATE_SUCCESS_ACTION,
    PROJECT_UPDATE_FAILED_ACTION,
    PROJECT_DELETE_FAILED_ACTION,
    PROJECT_DELETE_SUCCESS_ACTION,
  } from "../types/ProjectTypes";
  
  const initialState = {
    project: {},
    projectList: [],
    errorMessage: "",
    projectListLength: null,
  };
  
  export function ProjectReducer(state = initialState, action) {
    switch (action.type) {
      case PROJECT_LIST_SUCCESS_ACTION:
        return {
          ...state,
          projectList: action.payload.data,
          projectListLength: action.payload.length,
        };
      case PROJECT_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case PROJECT_ADD_SUCCESS_ACTION:
        return {
          ...state,
        };
      case PROJECT_ADD_FAILED_ACTION:
        return {
          errorMessage: action.payload.error,
        };
      case PROJECT_UPDATE_SUCCESS_ACTION:

        return {
          ...state,
        };
      case PROJECT_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case PROJECT_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case PROJECT_DELETE_FAILED_ACTION:
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
  
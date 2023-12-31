import {
    HEADER_ADD_SUCCESS_ACTION,
    HEADER_ADD_FAILED_ACTION,
    HEADER_LIST_SUCCESS_ACTION,
    HEADER_LIST_FAILED_ACTION,
    HEADER_UPDATE_SUCCESS_ACTION,
    HEADER_UPDATE_FAILED_ACTION,
    HEADER_DELETE_FAILED_ACTION,
    HEADER_DELETE_SUCCESS_ACTION,
  } from "../types/HeaderTypes";
  
  const initialState = {
    header: {},
    headerList: [],
    errorMessage: "",
    headerListLength: null,
  };
  
  export function HeaderReducer(state = initialState, action) {
    switch (action.type) {
      case HEADER_LIST_SUCCESS_ACTION:
        return {
          ...state,
          headerList: action.payload.data,
          headerListLength: action.payload.length,
        };
      case HEADER_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case HEADER_ADD_SUCCESS_ACTION:
        return {
          ...state,
        };
      case HEADER_ADD_FAILED_ACTION:
        return {
          errorMessage: action.payload.error,
        };
      case HEADER_UPDATE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case HEADER_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case HEADER_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case HEADER_DELETE_FAILED_ACTION:
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
  
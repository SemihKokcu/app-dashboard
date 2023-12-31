import {
    COMMENT_ADD_SUCCESS_ACTION,
    COMMENT_ADD_FAILED_ACTION,
    COMMENT_LIST_SUCCESS_ACTION,
    COMMENT_LIST_FAILED_ACTION,
    COMMENT_UPDATE_SUCCESS_ACTION,
    COMMENT_UPDATE_FAILED_ACTION,
    COMMENT_DELETE_SUCCESS_ACTION,
    COMMENT_DELETE_FAILED_ACTION,
  } from "../types/CommentTypes";
  
  const initialState = {
    comment: {},
    commentList: [],
    errorMessage: "",
    commentListLength: null,
  };
  
  export function CommentReducer(state = initialState, action) {
    switch (action.type) {
      case COMMENT_LIST_SUCCESS_ACTION:
        return {
          ...state,
          commentList: action.payload.data,
          commentListLength: action.payload.length,
        };
      case COMMENT_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
        case COMMENT_ADD_SUCCESS_ACTION:
          return {
            ...state,
          };
        case COMMENT_ADD_FAILED_ACTION:
          return {
            errorMessage: action.payload.error,
          };
      case COMMENT_UPDATE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case COMMENT_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case COMMENT_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
        case COMMENT_DELETE_FAILED_ACTION:
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
  
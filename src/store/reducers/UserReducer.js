import {
    USER_ADD_SUCCESS_ACTION,
    USER_ADD_FAILED_ACTION,
    USER_LIST_SUCCESS_ACTION,
    USER_LIST_FAILED_ACTION,
    USER_UPDATE_SUCCESS_ACTION,
    USER_UPDATE_FAILED_ACTION,
    USER_DELETE_FAILED_ACTION,
    USER_DELETE_SUCCESS_ACTION,
    USER_LIST_PAGINATED_SUCCESS_ACTION,
    USER_LIST_PAGINATED_FAILED_ACTION
  } from "../types/UserTypes";
  
  const initialState = {
    user: {},
    userList: [],
    errorMessage: "",
    pagination : {}
  };
  
  export function UserReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LIST_SUCCESS_ACTION:
        return {
          ...state,
          userList: action.payload,
        };
      case USER_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
        case USER_LIST_PAGINATED_SUCCESS_ACTION:
          return {
            ...state,
            userList: action.payload.users,
            pagination: action.payload.pagination,
          };
        case USER_LIST_PAGINATED_FAILED_ACTION:
          return {
            ...state,
            errorMessage: action.payload.error,
          };
      case USER_ADD_SUCCESS_ACTION:
        return {
          ...state,
        };
      case USER_ADD_FAILED_ACTION:
        return {
          errorMessage: action.payload.error,
        };
      case USER_UPDATE_SUCCESS_ACTION:

        return {
          ...state,
        };
      case USER_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case USER_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case USER_DELETE_FAILED_ACTION:
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
  
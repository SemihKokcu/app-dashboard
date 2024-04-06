import {
    ADDRESS_ADD_SUCCESS_ACTION,
    ADDRESS_ADD_FAILED_ACTION,
    ADDRESS_LIST_SUCCESS_ACTION,
    ADDRESS_LIST_FAILED_ACTION,
    ADDRESS_UPDATE_SUCCESS_ACTION,
    ADDRESS_UPDATE_FAILED_ACTION,
    ADDRESS_DELETE_SUCCESS_ACTION,
    ADDRESS_DELETE_FAILED_ACTION,
    ADDRESS_LIST_PAGINATED_FAILED_ACTION,
    ADDRESS_LIST_PAGINATED_SUCCESS_ACTION
  } from "../types/AddressTypes";
  
  const initialState = {
    address: {},
    addressList: [],
    errorMessage: "",
    addressListLength: null,
    pagination: {}
  };
  
  export function AddressReducer(state = initialState, action) {
    switch (action.type) {
      case ADDRESS_LIST_SUCCESS_ACTION:
        return {
          ...state,
          addressList: action.payload.data,
        };
      case ADDRESS_LIST_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
        case ADDRESS_LIST_PAGINATED_SUCCESS_ACTION:
        return {
          ...state,
          addressList: action.payload.addresses,
          pagination: action.payload.pagination,
        };
      case ADDRESS_LIST_PAGINATED_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
        case ADDRESS_ADD_SUCCESS_ACTION:
          return {
            ...state,
          };
        case ADDRESS_ADD_FAILED_ACTION:
          return {
            errorMessage: action.payload.error,
          };
      case ADDRESS_UPDATE_SUCCESS_ACTION:
        return {
          ...state,
        };
      case ADDRESS_UPDATE_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload.error,
        };
      case ADDRESS_DELETE_SUCCESS_ACTION:
        return {
          ...state,
        };
        case ADDRESS_DELETE_FAILED_ACTION:
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
  
import {
  CATEGORY_ADD_SUCCESS_ACTION,
  CATEGORY_ADD_FAILED_ACTION,
  CATEGORY_LIST_SUCCESS_ACTION,
  CATEGORY_LIST_FAILED_ACTION,
  CATEGORY_UPDATE_SUCCESS_ACTION,
  CATEGORY_UPDATE_FAILED_ACTION,
  CATEGORY_DELETE_SUCCESS_ACTION,
  CATEGORY_DELETE_FAILED_ACTION,
} from "../types/CategoryTypes";

const initialState = {
  category: {},
  categoryList: [],
  errorMessage: "",
  categoryListLength: null,
};

export function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS_ACTION:
      return {
        ...state,
        categoryList: action.payload,
      };
    case CATEGORY_LIST_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
      case CATEGORY_ADD_SUCCESS_ACTION:
        return {
          ...state,
        };
      case CATEGORY_ADD_FAILED_ACTION:
        return {
          errorMessage: action.payload.error,
        };
    case CATEGORY_UPDATE_SUCCESS_ACTION:

      return {
        ...state,
      };
    case CATEGORY_UPDATE_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    case CATEGORY_DELETE_SUCCESS_ACTION:

      return {
        ...state,
      };
      case CATEGORY_DELETE_FAILED_ACTION:
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

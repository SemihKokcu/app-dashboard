import {
  PRODUCT_ADD_SUCCESS_ACTION,
  PRODUCT_ADD_FAILED_ACTION,
  PRODUCT_LIST_SUCCESS_ACTION,
  PRODUCT_LIST_FAILED_ACTION,
  PRODUCT_UPDATE_SUCCESS_ACTION,
  PRODUCT_UPDATE_FAILED_ACTION,
  PRODUCT_DELETE_FAILED_ACTION,
  PRODUCT_DELETE_SUCCESS_ACTION,
} from "../types/ProductTypes";

const initialState = {
  product: {},
  productList: [],
  errorMessage: "",
  productListLength: null,
  pagination: {}
};

export function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS_ACTION:
      return {
        ...state,
        productList: action.payload.products,
        pagination: action.payload.pagination
      };
    case PRODUCT_LIST_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    case PRODUCT_ADD_SUCCESS_ACTION:
      return {
        ...state,
      };
    case PRODUCT_ADD_FAILED_ACTION:
      return {
        errorMessage: action.payload.error,
      };
    case PRODUCT_UPDATE_SUCCESS_ACTION:
      return {
        ...state,
      };
    case PRODUCT_UPDATE_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    case PRODUCT_DELETE_SUCCESS_ACTION:
      return {
        ...state,
      };
    case PRODUCT_DELETE_FAILED_ACTION:
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

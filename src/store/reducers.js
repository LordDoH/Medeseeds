/* eslint-disable default-param-last */
import {
  REQ_ERROR,
  EDIT_ANSWER,
  EDIT_POST,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  EDIT_ORDER,
  REGISTER_USER,
  VERIFY_USER,
  AUTHENTICATE_USER,
  OBTENER_USER,
  ERROR_TOKEN,
  SET_LOADING,
  LOGOUT,
  UPDATE_USER,
} from './types';

const initialState = {
  reqErr: false,
  editAnswer: {},
  editPost: {},
  editProduct: {},
  editCategory: {},
  editOrder: {},
  currentUser: {},
  loading: false,
  errorLogin: false,
  userAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  const newValue = action.payload;
  switch (action.type) {
    case REQ_ERROR:
      return { ...state, reqErr: newValue };
    case EDIT_ANSWER:
      return { ...state, editAnswer: newValue };
    case EDIT_POST:
      return { ...state, editPost: newValue };
    case EDIT_PRODUCT:
      return { ...state, editProduct: newValue };
    case EDIT_CATEGORY:
      return { ...state, editCategory: newValue };
    case EDIT_ORDER:
      return { ...state, editOrder: newValue };
    case REGISTER_USER:
      return { ...state, currentUser: newValue };
    case VERIFY_USER:
      localStorage.setItem('token', newValue);
      return { ...state, userAuthenticated: true, loading: false };
    case AUTHENTICATE_USER:
      localStorage.setItem('token', newValue);
      return {
        ...state,
        userAuthenticated: true,
      };
    case ERROR_TOKEN:
      return {
        ...state,
        errorLogin: newValue,
        userAuthenticated: !newValue,
        loading: false,
      };
    case OBTENER_USER:
      return {
        ...state,
        currentUserOTokencito: newValue,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: newValue,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        userAuthenticated: false,
        currentUser: {},
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: newValue,
      };

    default:
      return state;
  }
};

export default reducer;

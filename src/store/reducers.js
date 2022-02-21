/* eslint-disable default-param-last */
import {
  LOAD_CART,
  EDIT_ANSWER,
  EDIT_POST,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  EDIT_ORDER,
  AUTHENTICATE_USER,
  OBTAIN_USER,
  LOGOUT,
  UPDATE_USER,
} from './types';

const initialState = {
  cartState: {},
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
    case LOAD_CART:
      return { ...state, cartState: newValue };
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
    case AUTHENTICATE_USER:
      localStorage.setItem('token', newValue);
      return {
        ...state,
        userAuthenticated: true,
      };
    case OBTAIN_USER:
      return {
        ...state,
        currentUser: newValue,
        userAuthenticated: true,
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

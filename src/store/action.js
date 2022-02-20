import {
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

// action creators
const editAnswer = (answer) => ({
  type: EDIT_ANSWER,
  payload: answer,
});
const editPost = (post) => ({
  type: EDIT_POST,
  payload: post,
});
const editCategory = (category) => ({
  type: EDIT_CATEGORY,
  payload: category,
});
const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});
const editOrder = (order) => ({
  type: EDIT_ORDER,
  payload: order,
});
const authenticateUser = (user) => ({
  type: AUTHENTICATE_USER,
  payload: user,
});
const obtainUser = (user) => ({
  type: OBTAIN_USER,
  payload: user,
});
const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
const logOut = () => ({
  type: LOGOUT,
  payload: false,
});

const editedAnswer = (response) => async (dispatch) => {
  try {
    dispatch(editAnswer(response));
  } catch (e) {
    // console.log(e)
  }
};

const editedPost = (response) => async (dispatch) => {
  try {
    dispatch(editPost(response));
  } catch (e) {
    // console.log(e)
  }
};

const editedProduct = (response) => async (dispatch) => {
  try {
    dispatch(editProduct(response));
  } catch (e) {
    // console.log(e)
  }
};

const editedCategory = (response) => async (dispatch) => {
  try {
    dispatch(editCategory(response));
  } catch (e) {
    // console.log(e)
  }
};

const editedOrder = (response) => async (dispatch) => {
  try {
    dispatch(editOrder(response));
  } catch (e) {
    // console.log(e)
  }
};

const authenticatedUser = (response) => async (dispatch) => {
  try {
    dispatch(authenticateUser(response));
  } catch (e) {
    // console.log(e)
  }
};

const obtainedUser = (response) => async (dispatch) => {
  try {
    dispatch(obtainUser(response));
  } catch (e) {
    // console.log(e)
  }
};
const updatedUser = (response) => async (dispatch) => {
  try {
    dispatch(updateUser(response));
  } catch (e) {
    // console.log(e)
  }
};

const closeSesion = () => async (dispatch) => {
  try {
    dispatch(logOut());
  } catch (e) {
    // console.log(error);
  }
};

export default {
  editedAnswer,
  editedPost,
  editedCategory,
  editedProduct,
  editedOrder,
  authenticatedUser,
  obtainedUser,
  updatedUser,
  closeSesion,
};

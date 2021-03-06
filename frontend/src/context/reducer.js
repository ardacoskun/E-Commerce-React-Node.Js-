import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  GET_CART_START,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  REMOVE_CART_ITEM,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  ADD_CART_ITEM,
  GET_WISHLIST_SUCCESS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      isAlert: true,
      alertMessage: "Please fill in the required fields",
      alertClass: "danger",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isAlert: false,
      alertMessage: "",
      alertClass: "",
    };
  }

  if (action.type === REGISTER_START) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      isAlert: true,
      alertMessage: "User Created Successfully,Redirecting...",
      alertClass: "success",
    };
  }

  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      isLoading: false,
      isAlert: true,
      alertMessage: action.payload.msg,
      alertClass: "danger",
    };
  }

  if (action.type === LOGIN_START) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      isAlert: true,
      alertMessage: "Login Successfully,Redirecting...",
      alertClass: "success",
    };
  }

  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      isAlert: true,
      alertMessage: action.payload.msg,
      alertClass: "danger",
    };
  }

  if (action.type === LOGOUT_SUCCESS) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }

  if (action.type === GET_CART_START) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isAlert: false,
      cart: action.payload.cart,
      cartImages: action.payload.cartImages,
      cartNames: action.payload.cartNames,
      colors: action.payload.colors,
      sizes: action.payload.sizes,
      widths: action.payload.widths,
    };
  }

  if (action.type === GET_WISHLIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isAlert: false,
      wishlist: action.payload.wishlist,
      wishlistImages: action.payload.wishlistImages,
      wishlistNames: action.payload.wishlistNames,
      wishlistColors: action.payload.wishlistColors,
      wishlistSizes: action.payload.wishlistSizes,
      wishlistWidths: action.payload.wishlistWidths,
    };
  }

  if (action.type === GET_CART_ERROR) {
    return {
      ...state,
      isLoading: false,
      isAlert: true,
      alertMessage: action.payload.msg,
      alertClass: "danger",
    };
  }

  if (action.type === REMOVE_CART_ITEM) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === INCREASE_CART_ITEM) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DECREASE_CART_ITEM) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADD_CART_ITEM) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADD_CART_ITEM) {
    return {
      ...state,
      isLoading: true,
    };
  }

  throw new Error(`No action:${action.type}`);
};

export default reducer;

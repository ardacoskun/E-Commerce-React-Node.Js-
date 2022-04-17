import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
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

  throw new Error(`No action:${action.type}`);
};

export default reducer;

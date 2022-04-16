import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";

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
  throw new Error(`No action:${action.type}`);
};

export default reducer;

import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "./actions";

import reducer from "./reducer";

const initialState = {
  isLoading: false,
  isAlert: false,
  alertMessage: "",
  alertClass: "",
  user: null,
  token: null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, [2000]);
  };

  const register = async (newUser) => {
    dispatch({ type: REGISTER_START });

    try {
      const response = await axios.post("/auth/register", newUser);
      const { user, token } = response.data;

      dispatch({ type: REGISTER_SUCCESS, payload: { user, token } });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, register }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

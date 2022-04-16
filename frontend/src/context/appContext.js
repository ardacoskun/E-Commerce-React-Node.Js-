import React, { createContext, useContext, useReducer } from "react";
import { DISPLAY_ALERT } from "./actions";
import { CLEAR_ALERT } from "./actions";

import reducer from "./reducer";

const initialState = {
  isLoading: "false",
  isAlert: "false",
  alertMessage: "",
  alertClass: "",
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
    }, [3000]);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

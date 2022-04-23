import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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

import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  isAlert: false,
  alertMessage: "",
  alertClass: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  cart: [],
  wishlist: [],
  cartImages: [],
  cartNames: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, [2000]);
  };

  const addTokenLocalStorage = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const deleteTokenLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (newUser) => {
    dispatch({ type: REGISTER_START });

    try {
      const response = await axios.post("/auth/register", newUser);
      const { user, token } = response.data;

      dispatch({ type: REGISTER_SUCCESS, payload: { user, token } });
      addTokenLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const login = async (currentUser) => {
    dispatch({ type: LOGIN_START });
    try {
      const response = await axios.post("/auth/login", currentUser);
      const { user, token } = response.data;

      dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
      addTokenLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logout = () => {
    deleteTokenLocalStorage();
    dispatch({ type: LOGOUT_SUCCESS });
    navigate("/");
  };

  const getCart = async (endpoint) => {
    dispatch({ type: GET_CART_START });
    try {
      const { data } = await axios.get(`/${endpoint}`);

      if (endpoint === "cart") {
        return dispatch({
          type: GET_CART_SUCCESS,
          payload: {
            cart: data.response,
            cartImages: data.productImages,
            cartNames: data.productNames,
          },
        });
      }
      // if (endpoint === "wishlist") {
      //   return dispatch({
      //     type: GET_WISHLIST_SUCCESS,
      //     payload: {
      //       wishlist: ,
      //     },
      //   });
      // }
    } catch (error) {
      // dispatch({
      //   type: GET_CART_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
    }
  };

  const removeCartItem = async (productId, variantId, endpoint) => {
    dispatch({ type: REMOVE_CART_ITEM });
    try {
      await axios({
        method: "DELETE",
        url: `/${endpoint}/removeItem`,
        data: {
          productId,
          variantId,
        },
      });
      getCart(endpoint);
    } catch (error) {}
  };

  const increaseCartItem = async (productId, variantId, quantity, endpoint) => {
    dispatch({ type: INCREASE_CART_ITEM });

    quantity = quantity + 1;
    try {
      const productData = {
        productId,
        variantId,
        quantity,
      };
      await axios.post(`/${endpoint}/changeItemQuantity`, productData);
      getCart(endpoint);
    } catch (error) {}
  };

  const decreaseCartItem = async (productId, variantId, quantity, endpoint) => {
    dispatch({ type: DECREASE_CART_ITEM });

    if (quantity <= 0) {
      return removeCartItem(productId, variantId);
    }
    quantity = quantity - 1;

    try {
      const productData = {
        productId,
        variantId,
        quantity,
      };
      await axios.post(`/${endpoint}/changeItemQuantity`, productData);

      getCart(endpoint);
    } catch (error) {}
  };

  const addItemToCart = async (productId, variantId, quantity, endpoint) => {
    dispatch({ type: ADD_CART_ITEM });
    try {
      const productData = {
        productId,
        variantId,
        quantity,
      };
      const response = await axios.post(`/${endpoint}/addItem`, productData);

      navigate(`/${endpoint}`);
    } catch (error) {
      // dispatch({
      //   type: ADD_CART_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        register,
        login,
        logout,
        getCart,
        removeCartItem,
        increaseCartItem,
        decreaseCartItem,
        addItemToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

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
  colors: [],
  sizes: [],
  widths: [],
  wishlistColors: [],
  wishlistSizes: [],
  wishlistWidths: [],
  wishlistImages: [],
  wishlistNames: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.token}`,
    },
  };

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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const response = await axios.post("/api/auth/register", newUser, config);
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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const response = await axios.post("/api/auth/login", currentUser, config);
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
      const { data } = await axios.get(`/api/${endpoint}`, config);

      if (endpoint === "cart") {
        return dispatch({
          type: GET_CART_SUCCESS,
          payload: {
            cart: data.cartProducts,
            cartImages: data.productImages,
            cartNames: data.productNames,
            colors: data.colors,
            sizes: data.sizes,
            widths: data.widths,
          },
        });
      }
      if (endpoint === "wishlist") {
        return dispatch({
          type: GET_WISHLIST_SUCCESS,
          payload: {
            wishlist: data.wishlistProducts,
            wishlistImages: data.productImages,
            wishlistNames: data.productNames,
            wishlistColors: data.colors,
            wishlistSizes: data.sizes,
            wishlistWidths: data.widths,
            variantId: data.variantId,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CART_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };

  const removeCartItem = async (productId, variantId, endpoint) => {
    dispatch({ type: REMOVE_CART_ITEM });
    try {
      await axios({
        method: "DELETE",
        url: `/api/${endpoint}/removeItem`,
        data: {
          productId,
          variantId,
        },
        headers: { Authorization: `Bearer ${state.token}` },
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
      await axios.post(
        `/api/${endpoint}/changeItemQuantity`,
        productData,
        config
      );
      getCart(endpoint);
    } catch (error) {}
  };

  const decreaseCartItem = async (productId, variantId, quantity, endpoint) => {
    dispatch({ type: DECREASE_CART_ITEM });

    if (quantity < 1) {
      return removeCartItem(productId, variantId, endpoint);
    }
    quantity = quantity - 1;

    try {
      const productData = {
        productId,
        variantId,
        quantity,
      };
      await axios.post(
        `/api/${endpoint}/changeItemQuantity`,
        productData,
        config
      );

      getCart(endpoint);
    } catch (error) {}
  };

  const sendProductToCart = async (
    productId,
    productAttributes,
    quantity,
    endpoint,
    path
  ) => {
    dispatch({ type: ADD_CART_ITEM });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const productData = {
        productId,
        productAttributes,
        quantity,
        endpoint,
      };

      const { data } = await axios.post(
        `/api/${endpoint}/addItem`,
        productData,
        config
      );

      const variantId = data.variantId;

      if (path === "wishlist") {
        removeCartItem(productId, variantId, "wishlist");
      } else {
        navigate(`/${endpoint}`);
      }
    } catch (error) {
      if (
        error.response.data.statusCode === 401 ||
        error.response.data.msg.includes("401")
      ) {
        dispatch({
          type: LOGIN_ERROR,
          payload: { msg: "You need to sign in first" },
        });
        navigate("/signin");
        clearAlert();
      } else {
        dispatch({
          type: GET_CART_ERROR,
          payload: { msg: error.response.data.msg },
        });
        alert(error.response.data.msg);
      }
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
        sendProductToCart,
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

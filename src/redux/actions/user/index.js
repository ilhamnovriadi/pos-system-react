import axios from "axios";
import config from "../../../config";
import { fetchAddress } from "../address";
import { fetchCart } from "../cart";
import { fetchOrder, reset_order } from "../order";
const { baseUrl } = config;
export const fetch_user = () => {
  return {
    type: "FETCH_USER",
  };
};

export const receive_user = (payload) => {
  return {
    type: "FETCHED_USER",
    data: payload,
  };
};

export const receive_token = (payload) => {
  return {
    type: "FETCHED_TOKEN",
    data: payload,
  };
};

export const receive_error = () => {
  return {
    type: "RECEIVE_ERROR",
  };
};

export const did_logout = () => {
  return {
    type: "DID_LOGOUT",
  };
};

export const success_logout = () => {
  return {
    type: "SUCCESS_LOGOUT",
  };
};

export const reset_cart = () => {
  return {
    type: "RESET_CART",
  };
};

export const reset_address = () => {
  return {
    type: "RESET_ADDRESS",
  };
};

export const failed_logout = () => {
  return {
    type: "FAILED_LOGOUT",
  };
};

export const doLogin = (payload, error) => {
  return function (dispatch, getState) {
    dispatch(fetch_user());
    return axios
      .post(baseUrl + "/auth/login", payload)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No user found!!");
        } else {
          dispatch(receive_user(data.user));
          dispatch(receive_token(data.token));
          dispatch(fetchCart(data.token));
          dispatch(fetchAddress(data.token));
          dispatch(fetchOrder(data.token));
        }
      })
      .catch((err) => {
        error(true);
        dispatch(receive_error());
      });
  };
};

export const doLogout = (token) => {
  return function (dispatch) {
    dispatch(did_logout());
    return axios
      .post(
        baseUrl + "/auth/logout",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("Token Expired!!");
        } else {
          dispatch(success_logout());
          dispatch(reset_cart());
          dispatch(reset_address());
          dispatch(reset_order());
        }
      })
      .catch((err) => {
        dispatch(failed_logout());
      });
  };
};

import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const fetch_order = (payload) => {
  return {
    type: "FETCH_ORDER",
    data: payload,
  };
};

export const reset_order = () => {
  return {
    type: "RESET_ORDER",
  };
};

export const fetchOrder = (token) => {
  return function (dispatch) {
    return axios
      .get(baseUrl + "/api/orders", { headers: { Authorization: token } })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No tags found!!");
        } else {
          dispatch(fetch_order(data.data));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const createOrder = (token, payload, cb) => {
  return function (dispatch) {
    return axios
      .post(baseUrl + "/api/orders", payload, {
        headers: { Authorization: token },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No tags found!!");
        } else {
          // dispatch(get_cart(data));
          console.log(data);
          cb(data.order_numbers);
        }
      })
      .catch((err) => {
        cb("error");
        console.log(err);
      });
  };
};

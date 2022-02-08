import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const receive_address = (payload) => {
  return {
    type: "FETCHED_ADDRESS",
    data: payload,
  };
};

export const fetchAddress = (token) => {
  return function (dispatch, getState) {
    return axios
      .get(
        baseUrl + "/api/delivery-address",
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
          throw new Error("No address found!!");
        } else {
          dispatch(receive_address(data));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const addAddress = (token, payload, cb) => {
  return function (dispatch, getState) {
    return axios
      .post(baseUrl + "/api/delivery-address", payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No address found!!");
        } else {
          dispatch(fetchAddress(token));
          cb(data);
        }
      })
      .catch((err) => {
        cb({ status: "error", message: "Gagal Mengirim" });
        console.log(err);
      });
  };
};

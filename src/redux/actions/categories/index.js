import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const receive_categories = (payload) => {
  return {
    type: "FETCHED_CATEGORIES",
    data: payload,
  };
};

export const fetchCategories = () => {
  return function (dispatch, getState) {
    return axios
      .get(baseUrl + "/api/categories")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No categories found!!");
        } else {
          dispatch(receive_categories(data));
        }
      })
      .catch((err) => console.log(err));
  };
};

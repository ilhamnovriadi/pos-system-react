import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const receive_tags = (payload) => {
  return {
    type: "FETCHED_TAGS",
    data: payload,
  };
};

export const fetchTags = () => {
  return function (dispatch) {
    return axios
      .get(baseUrl + "/api/tags")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No tags found!!");
        } else {
          dispatch(receive_tags(data));
        }
      })
      .catch((err) => console.log(err));
  };
};

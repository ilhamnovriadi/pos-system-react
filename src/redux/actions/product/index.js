import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const fetchProduct = (attr, callback, error) => {
  return function () {
    return axios
      .get(baseUrl + `/api/products?category=${attr?.category??""}&q=${attr?.q??""}&tags=${attr?.tags.toString()??""}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No products found!!");
        } else {
          callback(data);
        }
      })
      .catch((err) => error(err));
  };
};

export const fetchDetailProduct = (id, callback, error) => {
  return function () {
    return axios
      .get(`${baseUrl}/api/products/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No products found!!");
        } else {
          callback(data);
        }
      })
      .catch((err) => error(err));
  };
};

import axios from "axios";
import config from "../../../config";
const { baseUrl } = config;

export const fetch_cart = () => {
  return {
    type: "FETCH_CART",
  };
};

export const get_cart = (payload) => {
  return {
    type: "GET_CART",
    data: payload,
  };
};

export const post_cart = () => {
  return {
    type: "POST_CART",
  };
};

export const add_cart = (payload) => {
  return {
    type: "ADD_CART",
    data: payload,
  };
};

export const add_cart_inc = (payload) => {
  return {
    type: "ADD_CART_INC",
    data: payload,
  };
};

export const inc_product = (payload) => {
  return {
    type: "INC_PRODUCT",
    data: payload,
  };
};

export const dec_product = (payload) => {
  return {
    type: "DEC_PRODUCT",
    data: payload,
  };
};

export const remove_cart = (id) => {
  return {
    type: "REMOVE_CART",
    data: id,
  };
};

export const fetchCart = (token) => {
  return function (dispatch) {
    return axios
      .get(baseUrl + "/api/cart", { headers: { Authorization: token } })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No tags found!!");
        } else {
          const concul = data.map((item) => {
            return {
              ...item.product,
              qty: item.qty,
            };
          });
          dispatch(get_cart(concul));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateCart = (token, payload, cb) => {
  const data = payload.map((item) => {
    return {
      product: item._id,
      qty: item.qty,
    };
  });
  return function (dispatch) {
    return axios
      .put(
        baseUrl + "/api/cart",
        { items: data },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No tags found!!");
        } else {
          // dispatch(get_cart(data));
          // console.log(data);
          cb("success");
        }
      })
      .catch((err) => {
        cb("error");
        console.log(err);
      });
  };
};

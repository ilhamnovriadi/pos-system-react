import React from "react";
import { FaShoppingCart, FaTags } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { add_cart, add_cart_inc, updateCart } from "../../redux/actions/cart";
import { formatUang } from "../../utils";
import "./index.scss";
import config from "../../config";
const { imageUrl } = config;

const Card = ({ data, cart, addCart, addCartInc, updateCart, token }) => {
  const history = useNavigate();
  return (
    <div
      className="card"
      // onClick={() => history(`/product/${data?._id}`)}
    >
      <div className="card__header">
        <img
          alt="product-imagecard"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = require("../../assets/dummy-image.jpg");
          }}
          className="card__image"
          src={`${imageUrl}/${data?.image_url}`}
        />
      </div>
      <div className="card__body">
        <div className="card__title">{data?.name}</div>
        <div className="card__price">{formatUang(data?.price)}</div>
        <div className="card__desc">
          <p>{data?.description}</p>
        </div>
        <small>Category</small>
        <div className="card__category">
          <p>{data?.category.name}</p>
        </div>
        <small>Tags</small>
        <div className="card__tagscontainer">
          {data?.tags.map((item, i) => {
            return (
              <div key={i} className="card__tags">
                <FaTags size={10} color="#fff" className="card__icon" />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => {
          const payload = {
            ...data,
            qty: 1,
          };

          const concul = cart.data.map((item) => {
            if (item._id === data._id) {
              return { ...item, qty: item.qty + 1 };
            } else {
              return item;
            }
          });
          const exist = cart.data.find((item) => item._id === data._id);
          if (exist) {
            updateCart(token, concul, function (e) {
              if (e === "success") {
                addCartInc(payload);
              } else {
                alert("Gagal Menambahkan");
              }
            });
          } else {
            updateCart(token, [...cart.data, payload], function (e) {
              if (e === "success") {
                addCart(payload);
              } else {
                alert("Gagal Menambahkan");
              }
            });
          }
        }}
        className="card__button"
      >
        <FaShoppingCart size={18} color="#fff" />
        <p>Masukan Keranjang</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    token: state.users.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (payload) => dispatch(add_cart(payload)),
    addCartInc: (payload) => dispatch(add_cart_inc(payload)),
    updateCart: (token, payload, cb) =>
      dispatch(updateCart(token, payload, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);

import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export const CounterFeature = ({
  data,
  updateCart,
  token,
  decProduct,
  incProduct,
  cart,
}) => {
  return (
    <div className="cart__card__counter">
      <button
        onClick={() => {
          if (data.qty > 1) {
            updateCart(
              token,
              cart.data.map((product) => {
                if (product._id === data._id) {
                  return { ...product, qty: product.qty - 1 };
                } else {
                  return product;
                }
              }),
              function (e) {
                if (e === "success") {
                  decProduct(data._id);
                } else {
                  console.log("Gagal Mengurangi");
                }
              }
            );
          }
        }}
        className="cart__card__counterbox"
      >
        <FaMinus size={10} color="white" />
      </button>
      <div className="cart__card__counters">
        <p>{data.qty}</p>
      </div>
      <button
        onClick={() => {
          updateCart(
            token,
            cart.data.map((product) => {
              if (product._id === data._id) {
                return { ...product, qty: product.qty + 1 };
              } else {
                return product;
              }
            }),
            function (e) {
              if (e === "success") {
                incProduct(data._id);
              } else {
                console.log("Gagal Menambahkan");
              }
            }
          );
        }}
        className="cart__card__counterbox"
      >
        <FaPlus size={10} color="white" />
      </button>
    </div>
  );
};

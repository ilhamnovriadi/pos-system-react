import React from "react";
import { FaTrash } from "react-icons/fa";

export const RemoveCart = ({ updateCart, token, cart, removeCart, data }) => {
  return (
    <div
      onClick={() => {
        updateCart(
          token,
          cart.data.filter((product) => product._id !== data._id),
          function (e) {
            if (e === "success") {
              removeCart(data._id);
            } else {
              console.log("Gagal Menghapus");
            }
          }
        );
      }}
      className="cart__card__delete"
    >
      <FaTrash size={15} color="white" />
      <p>Hapus</p>
    </div>
  );
};

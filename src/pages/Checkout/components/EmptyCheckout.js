import React from "react";
import Button from "../../../components/Button";

export const EmptyCheckout = ({ onClick }) => {
  return (
    <div className="center">
      <div className="cart__authtitle">
        <h1>Checkout</h1>
        <p>Belum tersedia produk</p>
      </div>
      <Button onClick={onClick} label="Belanja" />
    </div>
  );
};

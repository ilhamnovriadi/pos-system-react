import React from "react";
import Button from "../../../components/Button";

export const CartLogin = ({ onClick }) => {
  return (
    <div className="center">
      <div className="cart__authtitle">
        <h1>Keranjang</h1>
        <p>Silahkan Login untuk membuka keranjang</p>
      </div>
      <Button onClick={onClick} label="Login" />
    </div>
  );
};

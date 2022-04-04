import React from "react";
import Button from "../../../components/Button";

export const CheckoutLogin = ({ onClick }) => {
  return (
    <div className="center">
      <div className="checkout__title">
        <h1>Checkout</h1>
        <p>Silahkan Login untuk membuka checkout</p>
      </div>
      <Button onClick={onClick} label="Login" />
    </div>
  );
};

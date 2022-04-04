import React from "react";
import config from "../../../config";
import { formatCurrency } from "../../../utils";

const { imageUrl } = config;

export const CardImage = ({ data }) => {
  return (
    <div className="flex-row">
      <img
        alt="Product"
        className="cart__card__image"
        src={`${imageUrl}/${data.image_url}`}
      ></img>
      <div className="cart__card__name">
        <h3>{data.name}</h3>
        <small>Harga</small>
        <p>{formatCurrency(data.price)}</p>
      </div>
    </div>
  );
};

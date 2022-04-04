import React from "react";
import { formatCurrency } from "../../../../utils";

export const ExpandItem = ({ item }) => {
  return (
    <div className="pemesanan__expand">
      <div className="flex-row">
        <div className="pemesanan__expand__col">
          <p className="pemesanan__label">Barang</p>
        </div>
        <div className="pemesanan__expand__col">
          <p className="pemesanan__label">Jumlah</p>
        </div>
        <div className="pemesanan__expand__col">
          <p className="pemesanan__label">Total Harga</p>
        </div>
      </div>
      {item.order_items.map((c, i) => {
        return (
          <div key={i} className="flex-row">
            <div className="pemesanan__expand__col">
              <p className="pemesanan__expand__desc">{c.name}</p>
            </div>
            <div className="pemesanan__expand__col">
              <p className="pemesanan__expand__desc">{c.qty}</p>
            </div>
            <div className="pemesanan__expand__col">
              <p className="pemesanan__expand__desc">
                {formatCurrency(c.price)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

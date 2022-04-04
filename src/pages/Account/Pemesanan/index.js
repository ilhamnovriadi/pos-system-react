import React, { useState } from "react";
import { formatCurrency } from "../../../utils";
import { ExpandItem } from "./component/ExpandItem";
import { List } from "./component/List";

const Pemesanan = ({ data }) => {
  const [expand, setExpand] = useState("");
  return (
    <div className="pemesanan">
      <div className="pemesanan__title">
        <h2>Pemesanan</h2>
      </div>
      <div className="pemesanan__body">
        <div className="pemesanan__dash"></div>
        {data.length < 1 ? (
          <div className="center">
            <p>Belum tersedia pesanan</p>
          </div>
        ) : null}
        {data.map((item, i) => {
          let total = 0;
          item.order_items.map((e) => {
            total += e.price * e.qty;
          });
          return (
            <div key={i}>
              <div
                onClick={() => {
                  if (expand === item.id) {
                    setExpand("");
                  } else {
                    setExpand(item.id);
                  }
                }}
                className={`pemesanan__card ${
                  expand === item.id ? "pemesanan__card--active" : ""
                }`}
              >
                <List label="Order ID" value={`#${item.order_numbers}`} />
                <List label="Total" value={formatCurrency(total)} />
                <List
                  label="Status"
                  value={
                    item.status === "waiting_payment"
                      ? "Waiting Payment"
                      : "Paid"
                  }
                />
                <List label="Invoice">
                  <button
                    onClick={() =>
                      window.open(`/invoice/${item.order_numbers}`, "_blank")
                    }
                    className="pemesanan__download"
                  >
                    Invoice
                  </button>
                </List>
              </div>
              <div className="pemesanan__expand__dash"></div>
              {expand === item.id ? <ExpandItem item={item} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pemesanan;

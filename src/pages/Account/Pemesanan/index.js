import React, { useState } from "react";
import { useNavigate } from "react-router";
import { formatUang } from "../../../utils";

const Pemesanan = ({ data }) => {
  const history = useNavigate();
  const PESANAN = [
    { id: 1, status: "Waiting Payment" },
    { id: 2, status: "Process" },
  ];
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
                <div className="pemesanan__col">
                  <p className="pemesanan__label">Order ID</p>
                  <p className="pemesanan__desc">#{item.order_numbers}</p>
                </div>
                <div className="pemesanan__col">
                  <p className="pemesanan__label">Total</p>
                  <p className="pemesanan__desc">{formatUang(total)}</p>
                </div>
                <div className="pemesanan__col">
                  <p className="pemesanan__label">Status</p>
                  <p className="pemesanan__desc">
                    {item.status === "waiting_payment"
                      ? "Waiting Payment"
                      : "Paid"}
                  </p>
                </div>
                <div className="pemesanan__col">
                  <p className="pemesanan__label">Invoice</p>
                  <button
                    onClick={() =>
                      window.open(`/invoice/${item.order_numbers}`, "_blank")
                    }
                    className="pemesanan__download"
                  >
                    Invoice
                  </button>
                </div>
              </div>
              <div className="pemesanan__expand__dash"></div>
              {expand === item.id ? (
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
                            {formatUang(c.price)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pemesanan;

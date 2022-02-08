import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import config from "../../config";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import "./index.scss";
import { formatUang } from "../../utils";
const { baseUrl } = config;

const Invoice = ({ token }) => {
  const history = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(baseUrl + "/api/invoice/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let total = 0
  data?.order_items.map(item => {
    total += item.qty*item.price
  })
  return (
    <Loader isActive={false} text={"Tunggu yah"}>
      <div className="invoice">
        <div className="invoice__title">
          <h1>Invoice</h1>
          <div className="invoice__list"></div>
          <div className="invoice__total">
            <p>Status</p>
            <h3>{data?.payment_status === "waiting_payment" ? "Waiting Payment" : "Paid"}</h3>
          </div>
          <div className="invoice__total">
            <p>Order ID</p>
            <h3>#{id}</h3>
          </div>
          <div className="invoice__total">
            <p>Total</p>
            <h3>{formatUang(total)}</h3>
          </div>
          <div className="invoice__total">
            <p>Billed to</p>
            <div className="invoice__listdesc">
              <p>
                <strong>{data?.address.nama_penerima}</strong>
              </p>
              <p>{data?.user.email}</p>
              <p>{data?.address.kota_kecamatan}</p>
            </div>
          </div>
          <div className="invoice__total">
            <p>Payment to</p>
            <div className="invoice__listdesc">
              <p>
                <strong>Ilham Novriadi</strong>
              </p>
              <p>BSI</p>
              <p>No.Rek 9123091232</p>
            </div>
          </div>
          <div className="invoice__devider"></div>
          <div className="invoice__containerbutton">
            <Button onClick={() => history("/")} label="Lanjutkan Belanja" />
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Invoice;

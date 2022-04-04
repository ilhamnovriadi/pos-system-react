import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { createOrder } from "../../redux/actions/order";
import { formatCurrency } from "../../utils";
import { AddressOption } from "./components/AddressOption";
import { CheckoutLogin } from "./components/CheckoutLogin";
import { EmptyCheckout } from "./components/EmptyCheckout";
import { List } from "./components/List";
import "./index.scss";

const Checkout = ({ cart, address, token, create_Order }) => {
  const history = useNavigate();
  const [showAlamat, setShowAlamat] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [idAlamat, setIdAlamat] = useState("");

  const toggle = () => {
    setShowAlamat(!showAlamat);
  };

  let ongkir = 34000;
  let hitung = 0;
  cart.data.map((item) => {
    hitung += item.qty * item.price;
  });

  return (
    <Loader isActive={false} text={"Tunggu yah"}>
      <div className="checkout">
        {!true ? (
          <CheckoutLogin onClick={() => history("/account")} />
        ) : cart.data.length > 0 ? (
          <div className="checkout__title">
            <h1>Checkout</h1>
            <div className="checkout__list"></div>
            <List label="Alamat Pengiriman">
              <button onClick={toggle} className="checkout__buttonalamat">
                <FaMapMarkerAlt size={18} color="#424242" />
                <h4>{alamat === "" ? "Pilih Alamat" : alamat}</h4>
              </button>
              {showAlamat ? (
                <AddressOption
                  address={address}
                  setAlamat={setAlamat}
                  setIdAlamat={setIdAlamat}
                  setShowAlamat={setShowAlamat}
                />
              ) : null}
            </List>
            <List label="Sub Total" value={formatCurrency(hitung)} />
            <List label="Ongkir" value={formatCurrency(ongkir)} />
            <List
              label="Total"
              strong
              value={formatCurrency(hitung + ongkir)}
            />

            <div className="checkout__containerbutton">
              <Button
                secondary="true"
                onClick={() => history(-1)}
                label="Kembali"
              />
              <Button
                disabled={alamat === ""}
                onClick={() => {
                  const payload = {
                    delivery_address: idAlamat,
                    delivery_fee: ongkir,
                  };
                  create_Order(token, payload, function (e) {
                    history("/invoice/" + e);
                  });
                }}
                label="Bayar Sekarang"
              />
            </div>
          </div>
        ) : (
          <EmptyCheckout onClick={() => history("/")} />
        )}
      </div>
    </Loader>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    token: state.users.token,
    address: state.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create_Order: (token, payload, cb) =>
      dispatch(createOrder(token, payload, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

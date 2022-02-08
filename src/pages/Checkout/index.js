import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { createOrder } from "../../redux/actions/order";
import { formatUang } from "../../utils";
import "./index.scss";

const Checkout = ({ cart, address, token, create_Order }) => {
  const history = useNavigate();
  const [dataProduk, setDataProduk] = useState([]);
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
          <div className="center">
            <div className="checkout__title">
              <h1>Checkout</h1>
              <p>Silahkan Login untuk membuka checkout</p>
            </div>
            <Button onClick={() => history("/account")} label="Login" />
          </div>
        ) : cart.data.length > 0 ? (
          <div className="checkout__title">
            <h1>Checkout</h1>
            <div className="checkout__list"></div>
            <div className="checkout__total">
              <p>Alamat Pengiriman</p>
              <button onClick={toggle} className="checkout__buttonalamat">
                <FaMapMarkerAlt size={18} color="#424242" />
                <h4>{alamat === "" ? "Pilih Alamat" : alamat}</h4>
              </button>
              {showAlamat ? (
                <div className="checkout__containeralamat">
                  {address.map((item, i) => {
                    return (
                      <div
                        onClick={() => {
                          setAlamat(
                            item.kota_kecamatan + " - " + item.alamat_lengkap
                          );
                          setIdAlamat(item._id);
                          setShowAlamat(false);
                        }}
                        key={i}
                        className="checkout__listalamat"
                      >
                        <p>
                          {item.kota_kecamatan + " - " + item.alamat_lengkap}
                        </p>
                      </div>
                    );
                  })}
                  <div
                    onClick={() => {
                      history("/account#tambah-alamat");
                    }}
                    className="checkout__listalamat"
                  >
                    <p> + Tambah Alamat</p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="checkout__total">
              <p>Sub Total</p>
              <h3>{formatUang(hitung)}</h3>
            </div>
            <div className="checkout__total">
              <p>Ongkir</p>
              <h3>{formatUang(ongkir)}</h3>
            </div>
            <div className="checkout__total">
              <p>
                <strong>Total</strong>
              </p>
              <h3>{formatUang(hitung + ongkir)}</h3>
            </div>
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
          <div className="center">
            <div className="cart__authtitle">
              <h1>Checkout</h1>
              <p>Belum tersedia produk</p>
            </div>
            <Button onClick={() => history("/")} label="Belanja" />
          </div>
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

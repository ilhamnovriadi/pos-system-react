import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import {
  inc_product,
  dec_product,
  remove_cart,
  updateCart,
} from "../../redux/actions/cart";
import { formatUang } from "../../utils";
import "./index.scss";
import config from "../../config";
const { imageUrl } = config;

const Cart = ({
  users,
  cart,
  token,
  removeCart,
  incProduct,
  decProduct,
  updateCart,
}) => {
  const history = useNavigate();
  const [dataProduk, setDataProduk] = useState([]);

  let hitung = 0;
  return (
    <Loader isActive={false} text={"Tunggu yah"}>
      <div className="cart">
        {users?.token === "" ? (
          <div className="center">
            <div className="cart__authtitle">
              <h1>Keranjang</h1>
              <p>Silahkan Login untuk membuka keranjang</p>
            </div>
            <Button onClick={() => history("/account")} label="Login" />
          </div>
        ) : cart.data.length > 0 ? (
          <div className="cart__title">
            <h1>Keranjang</h1>
            <div className="cart__list">
              {cart.data.map((item, i) => {
                hitung += item.qty * item.price;
                return (
                  <div key={i} className="cart__card">
                    <div className="flex-row">
                      <img
                        alt="Product"
                        className="cart__card__image"
                        src={`${imageUrl}/${item.image_url}`}
                      ></img>
                      <div className="cart__card__name">
                        <h3>{item.name}</h3>
                        <small>Harga</small>
                        <p>{formatUang(item.price)}</p>
                      </div>
                    </div>
                    <div className="cart__card__counter">
                      <button
                        onClick={() => {
                          if (item.qty > 1) {
                            updateCart(
                              token,
                              cart.data.map((product) => {
                                if (product._id === item._id) {
                                  return { ...product, qty: product.qty - 1 };
                                } else {
                                  return product;
                                }
                              }),
                              function (e) {
                                if (e === "success") {
                                  decProduct(item._id);
                                } else {
                                  console.log("Gagal Mengurangi");
                                }
                              }
                            );
                          }
                        }}
                        className="cart__card__counterbox"
                      >
                        <FaMinus size={10} color="white" />
                      </button>
                      <div className="cart__card__counters">
                        <p>{item.qty}</p>
                      </div>
                      <button
                        onClick={() => {
                          updateCart(
                            token,
                            cart.data.map((product) => {
                              if (product._id === item._id) {
                                return { ...product, qty: product.qty + 1 };
                              } else {
                                return product;
                              }
                            }),
                            function (e) {
                              if (e === "success") {
                                incProduct(item._id);
                              } else {
                                console.log("Gagal Menambahkan");
                              }
                            }
                          );
                        }}
                        className="cart__card__counterbox"
                      >
                        <FaPlus size={10} color="white" />
                      </button>
                    </div>
                    <div className="cart__card__subtotal">
                      <p>{formatUang(item.price * item.qty)}</p>
                    </div>
                    <div
                      onClick={() => {
                        updateCart(
                          token,
                          cart.data.filter(
                            (product) => product._id !== item._id
                          ),
                          function (e) {
                            if (e === "success") {
                              removeCart(item._id);
                            } else {
                              console.log("Gagal Menghapus");
                            }
                          }
                        );
                      }}
                      className="cart__card__delete"
                    >
                      <FaTrash size={15} color="white" />
                      <p>Hapus</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart__total">
              <p>Sub Total</p>
              <h3>{formatUang(hitung)}</h3>
            </div>
            <div className="cart__containerbutton">
              <Button onClick={() => history("/checkout")} label="Lanjutkan" />
            </div>
          </div>
        ) : (
          <div className="center">
            <div className="cart__authtitle">
              <h1>Keranjang</h1>
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
    users: state.users,
    cart: state.cart,
    token: state.users.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (payload) => dispatch(remove_cart(payload)),
    incProduct: (id) => dispatch(inc_product(id)),
    decProduct: (id) => dispatch(dec_product(id)),
    updateCart: (token, payload, cb) => dispatch(updateCart(token, payload, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React from "react";
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
import { formatCurrency } from "../../utils";
import "./index.scss";
import { EmptyCart } from "./components/EmptyCart";
import { CounterFeature } from "./components/CounterFeature";
import { RemoveCart } from "./components/RemoveCart";
import { CartLogin } from "./components/CartLogin";
import { CardImage } from "./components/CardImage";

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

  let hitung = 0;
  return (
    <Loader isActive={false} text={"Tunggu yah"}>
      <div className="cart">
        {users?.token === "" ? (
          <CartLogin onClick={() => history("/account")} />
        ) : cart.data.length > 0 ? (
          <div className="cart__title">
            <h1>Keranjang</h1>
            <div className="cart__list">
              {cart.data.map((item, i) => {
                hitung += item.qty * item.price;
                return (
                  <div key={i} className="cart__card">
                    <CardImage data={item} />
                    <CounterFeature
                      data={item}
                      cart={cart}
                      token={token}
                      updateCart={updateCart}
                      decProduct={decProduct}
                      incProduct={incProduct}
                    />
                    <div className="cart__card__subtotal">
                      <p>{formatCurrency(item.price * item.qty)}</p>
                    </div>
                    <RemoveCart
                      data={item}
                      cart={cart}
                      token={token}
                      updateCart={updateCart}
                      removeCart={removeCart}
                    />
                  </div>
                );
              })}
            </div>
            <div className="cart__total">
              <p>Sub Total</p>
              <h3>{formatCurrency(hitung)}</h3>
            </div>
            <div className="cart__containerbutton">
              <Button onClick={() => history("/checkout")} label="Lanjutkan" />
            </div>
          </div>
        ) : (
          <EmptyCart onClick={() => history("/")} />
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
    updateCart: (token, payload, cb) =>
      dispatch(updateCart(token, payload, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import "./App.scss";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Breadcrumb from "./components/Breadcrumb";
import Account from "./pages/Account";
import Footer from "./components/Footer.js";
import Product from "./pages/Product";
import { useEffect, useState } from "react";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import { connect } from "react-redux";
import { fetchCategories } from "./redux/actions/categories";
import { fetchTags } from "./redux/actions/tags";
import { fetchAddress } from "./redux/actions/address";
import { fetchCart } from "./redux/actions/cart";
import { fetchOrder } from "./redux/actions/order";
const CATEGORY = ["Monitor", "Laptop", "Komputer", "Aksesoris", "Sparepart"];

function App({
  users,
  data,
  cart,
  tags,
  order,
  fetch_Categories,
  fetch_Tags,
  fetch_Address,
  fetch_Cart,
  fetch_Order,
}) {
  const location = useLocation();
  const [categorySelect, setCategorySelect] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch_Categories();
    fetch_Tags();
    if (users.token !== "") {
      fetch_Address(users.token);
      fetch_Cart(users.token);
      fetch_Order(users.token);
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar
        inputValue={keyword}
        onChangeInput={(e) => {
          setKeyword(e);
        }}
        cart={cart}
        category={CATEGORY}
        value={categorySelect}
        onChange={(e) => setCategorySelect(e)}
      />
      <Breadcrumb pathname={location.pathname} />
      <div className="row">
        <Routes>
          <Route
            path="/"
            element={
              <Home search={keyword} tags={tags} category={categorySelect} />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account"
            element={<Account data={users} order={order} />}
          />
          <Route path="/checkout" element={<Checkout data={users} />} />
          <Route
            path="/invoice/:id"
            element={<Invoice token={users.token} />}
          />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
      <Footer position="--sticky" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    tags: state.tags,
    cart: state.cart,
    order: state.order,
    data: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions

    fetch_Cart: (token) => dispatch(fetchCart(token)),
    fetch_Tags: () => dispatch(fetchTags()),
    fetch_Categories: () => dispatch(fetchCategories()),
    fetch_Address: (token) => dispatch(fetchAddress(token)),
    fetch_Order: (token) => dispatch(fetchOrder(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

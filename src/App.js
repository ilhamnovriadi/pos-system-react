import "./App.scss";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Breadcrumb from "./components/Breadcrumb";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import { useEffect, useState } from "react";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import { connect } from "react-redux";
import { fetchCategories } from "./redux/actions/categories";
import { fetchTags } from "./redux/actions/tags";
const CATEGORY = ["Monitor", "Laptop", "Komputer", "Aksesoris", "Sparepart"];

function App({
  users,
  data,
  cart,
  tags,
  order,
  fetch_Categories,
  fetch_Tags,
}) {
  const location = useLocation();
  const [categorySelect, setCategorySelect] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (data?.categories.length === 0) {
      fetch_Categories();
    }
    if (data?.tags.length === 0) {
      fetch_Tags();
    }
  }, []);

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
    fetch_Tags: () => dispatch(fetchTags()),
    fetch_Categories: () => dispatch(fetchCategories()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

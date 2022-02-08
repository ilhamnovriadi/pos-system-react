import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import "./index.scss";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = ({
  category,
  onChange,
  value,
  state_categories,
  cart,
  inputValue,
  onChangeInput,
}) => {
  const history = useNavigate();
  const [isShownHoverContent, setIsShownHoverContent] = useState(false);
  return (
    <div className="row">
      <div className="navbar">
        <div className="flex-row">
          <Link to="/">
            <h2>POS System</h2>
          </Link>
          <div>
            <div
              className="button-menu"
              onMouseEnter={() => setIsShownHoverContent(true)}
              onMouseLeave={() => setIsShownHoverContent(false)}
            >
              <p>{value !== "" ? value : "Utama"}</p>
              <FaChevronDown
                className="button-menu__icon"
                size={10}
                color="#fff"
              />
            </div>
            {isShownHoverContent && (
              <div
                className="menu-kategori"
                onMouseEnter={() => setIsShownHoverContent(true)}
                onMouseLeave={() => setIsShownHoverContent(false)}
              >
                <div onClick={() => onChange("")} className="menu-item">
                  <p>Utama</p>
                </div>
                {state_categories.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => onChange(item.name)}
                      className={`menu-item ${
                        value === item ? "menu-item--active" : ""
                      }`}
                    >
                      <p>{item.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex-row">
          <div className="form-pencarian">
            <div className="form-pencarian-icon">
              <FaSearch size={20} color="#e1e1e1" />
            </div>
            <input
              value={inputValue}
              onChange={(e) => {
                history("/");
                onChangeInput(e.target.value);
              }}
              placeholder="Masukan Kata Pencarian"
            ></input>
          </div>
          <Link to="/cart">
            <div className="cart-button">
              <FaShoppingCart size={20} color="white" />
              <p>Keranjang</p>
              {cart.data.length > 0 ? (
                <div className="cart-button__ballon">
                  <p>{cart.data.length}</p>
                </div>
              ) : null}
            </div>
          </Link>
          <Link to="/account">
            <div className="cart-button">
              <FaUserCircle size={20} color="white" />
              <p>Akun</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state_categories: state.categories,
  };
};

export default connect(mapStateToProps, null)(Navbar);

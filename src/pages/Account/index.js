import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaLock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { doLogin, doLogout } from "../../redux/actions/user";
import Alamat from "./Alamat";
import "./index.scss";
import Pemesanan from "./Pemesanan";
import Profil from "./Profil";

const Account = ({ isLoading, data, address, order }) => {
  const MENU = [
    {
      label: "Profil",
      icon: (e) => {
        return (
          <FaUser size={20} color={`${e === "Profil" ? "#fff" : "#00aeef"}`} />
        );
      },
    },
    {
      label: "Pemesanan",
      icon: (e) => {
        return (
          <FaClipboardList
            size={20}
            color={`${e === "Pemesanan" ? "#fff" : "#00aeef"}`}
          />
        );
      },
    },
    {
      label: "Alamat",
      icon: (e) => {
        return (
          <FaMapMarkerAlt
            size={20}
            color={`${e === "Alamat" ? "#fff" : "#00aeef"}`}
          />
        );
      },
    },
  ];

  const location = useLocation();
  const { userData } = data;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("nurainiani@gmail.com");
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("adminadmin");
  const [menuActive, setMenuActive] = useState("Profil");

  const renderBody = (user) => {
    switch (menuActive) {
      case "Profil":
        return (
          <Profil data={user} logout={() => dispatch(doLogout(data?.token))} />
        );
      case "Pemesanan":
        return <Pemesanan data={order} />;
      case "Alamat":
        return (
          <Alamat
            data={address}
            buttonAdd={location?.hash === "#tambah-alamat"}
          />
        );
      default:
        break;
    }
  };

  const loginUser = () => {
    setIsError(false);
    const payload = {
      email,
      password,
    };
    dispatch(
      doLogin(payload, function (err) {
        if (err) {
          setIsError(true);
        }
      })
    );
  };

  useEffect(() => {
    if (location?.hash === "#tambah-alamat") {
      setMenuActive("Alamat");
    }
  }, []);
  return (
    <Loader isActive={isLoading} text={"Tunggu yah"}>
      {data?.token === "" ? (
        <div className="login">
          <div className="login__title">
            <h1>Login</h1>
            <p>Masukan Username dan Password</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              icon={<FaUser size={15} color={"#999999"} />}
              placeholder="Email"
              value={email}
              type="email"
              errors={false ? 1 : 0}
              onChange={(e) => {
                setIsError(false);
                setEmail(e.target.value);
              }}
            />
            <Input
              icon={<FaLock size={15} color={"#999999"} />}
              placeholder="Password"
              value={password}
              autoComplete="on"
              type="password"
              errors={false ? 1 : 0}
              onChange={(e) => {
                setIsError(false);
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" onClick={loginUser} label="Login" />
            {isError ? (
              <div className="input__error">
                <p>Gagal login periksa email dan password</p>
              </div>
            ) : null}
          </form>
        </div>
      ) : (
        <div className="account">
          <div className="account__title">
            <h1>Akun</h1>
            <div className="account__container">
              <div className="account__sidebar">
                {MENU.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setMenuActive(item.label)}
                      className={`account__menu ${
                        menuActive === item.label ? "account__menu--active" : ""
                      }`}
                    >
                      {item.icon(menuActive)}
                      <p>{item.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="account__body">{renderBody(userData)}</div>
            </div>
          </div>
        </div>
      )}
    </Loader>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.isFetching,
    address: state.address,
  };
};

export default connect(mapStateToProps, null)(Account);

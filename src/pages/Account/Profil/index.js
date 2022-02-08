import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Profil = ({ data, logout }) => {
  return (
    <div className="profil">
      <div className="profil__title">
        <h2>Profil</h2>
        <button onClick={logout} className="profil__button">
          <FaSignOutAlt size={12} color="white" className="profil__icon" />
          Logout
        </button>
      </div>
      <div className="profil__body">
        <div className="profil__dash"></div>
        <div className="profil__card">
          <p className="profil__label">Nama Lengkap</p>
          <p className="profil__desc">{data?.fullname}</p>
        </div>
        <div className="profil__card">
          <p className="profil__label">Email</p>
          <p className="profil__desc">{data?.email}</p>
        </div>
        <div className="profil__card">
          <p className="profil__label">ID Costumer</p>
          <p className="profil__desc">#{data?.customer_id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;

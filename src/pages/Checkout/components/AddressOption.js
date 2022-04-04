import React from "react";
import { useNavigate } from "react-router-dom";
export const AddressOption = ({
  address,
  setAlamat,
  setIdAlamat,
  setShowAlamat,
}) => {
  const history = useNavigate();
  return (
    <div className="checkout__containeralamat">
      {address.map((item, i) => {
        return (
          <div
            onClick={() => {
              setAlamat(item.kota_kecamatan + " - " + item.alamat_lengkap);
              setIdAlamat(item._id);
              setShowAlamat(false);
            }}
            key={i}
            className="checkout__listalamat"
          >
            <p>{item.kota_kecamatan + " - " + item.alamat_lengkap}</p>
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
  );
};

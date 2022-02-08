import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InputField from "../../../components/InputField";
import Loader from "../../../components/Loader";
import { addAddress } from "../../../redux/actions/address";

const Alamat = ({ buttonAdd, data, addAddress, token }) => {
  const [tambahForm, setTambahForm] = useState(false);
  const toogle = () => {
    setTambahForm(!tambahForm);
  };

  const [isLoading, setisLoading] = useState("");
  const [nama_penerima, setnama_penerima] = useState("");
  const [nomor_handphone, setnomor_handphone] = useState("");
  const [label_alamat, setlabel_alamat] = useState("Rumah");
  const [kota_kecamatan, setkota_kecamatan] = useState("");
  const [alamat_lengkap, setalamat_lengkap] = useState("");

  const tambahAlamat = () => {
    setisLoading(true);
    const payload = {
      nama_penerima,
      nomor_handphone,
      label_alamat,
      kota_kecamatan,
      alamat_lengkap,
    };
    addAddress(token, payload, function (e) {
      if (e?.status !== "error") {
        setisLoading(false);
        toogle();
      }
    });
  };

  useEffect(() => {
    if (buttonAdd) {
      toogle();
    }
  }, []);
  return (
    <Loader isActive={isLoading} text={"Tunggu yah"}>
      <div className="alamat">
        <div className="alamat__title">
          <h2>{tambahForm ? "Tambah Alamat" : "Alamat"}</h2>
          <button onClick={toogle} className="alamat__button">
            {tambahForm ? "Kembali" : "Tambah Alamat"}
          </button>
        </div>
        {tambahForm ? (
          <div className="alamat__body">
            <div className="alamat__dash"></div>
            <InputField
              label="Nama Penerima"
              value={nama_penerima}
              onChange={(e) => setnama_penerima(e.target.value)}
              placeholder="Masukan Nama Penerima"
            />
            <InputField
              label="Kota Kecamatan"
              placeholder="Masukan Kota, Kecamatan"
              value={kota_kecamatan}
              onChange={(e) => setkota_kecamatan(e.target.value)}
            />
            <InputField
              label="No Handphone"
              placeholder="Masukan Nomor Handphone"
              value={nomor_handphone}
              onChange={(e) => setnomor_handphone(e.target.value)}
            />
            <InputField
              rows={3}
              value={alamat_lengkap}
              onChange={(e) => setalamat_lengkap(e.target.value)}
              kind="textarea"
              label="Alamat Lengkap"
              placeholder="Masukan Alamat Lengkap"
            />
            <button onClick={tambahAlamat} className="alamat__body__button">
              Tambahkan
            </button>
          </div>
        ) : (
          <div className="alamat__body">
            <div className="alamat__dash"></div>
            {data.map((item, i) => {
              return (
                <div key={i} className="alamat__card">
                  <p className="alamat__label">
                    Alamat : {item?.nama_penerima}
                  </p>
                  <p className="alamat__desc">{item?.kota_kecamatan}</p>
                  <p className="alamat__descdetail">{item?.alamat_lengkap}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Loader>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAddress: (token, payload, cb) =>
      dispatch(addAddress(token, payload, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Alamat);

import React from "react";
import "./index.scss";

const Footer = (props) => {
  return (
    <div className="row">
      <div className={`footer__container${props?.position ?? ""}`}>
        <p>
          © 2022 POS System - Developed with
          <img
          alt="love"
            className="footer__icon"
            src="https://whdigital.id/images/love.gif"
          ></img>
          by Ilham Novriadi
        </p>
      </div>
    </div>
  );
};

export default Footer;

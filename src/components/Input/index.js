import React from "react";
import "./index.scss";

const Input = (props) => {
  return (
    <div className="input">
      <div className="input__icon">{props?.icon}</div>
      <input className="input__container" {...props}></input>
      {props.errors ? (
        <div className="input__error">
          <p>* Masukan {props?.placeholder}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Input;

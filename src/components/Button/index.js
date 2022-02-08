import React from "react";
import "./index.scss";

const Button = (props) => {
  return (
    <div className="button">
      <button
        disabled={props.disabled}
        className={`button__container ${
          props?.secondary ? "button__container__secondary" : ""
        } ${props.disabled ? "button__container__disabled" : ""}`}
        {...props}
      >
        {props?.label}
      </button>
    </div>
  );
};

export default Button;

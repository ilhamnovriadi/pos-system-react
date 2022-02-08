import React from "react";
import "./index.scss";

const InputField = (props) => {
  const type = () => {
    switch (props?.kind) {
      case "input":
        return <input {...props}></input>;
      case "textarea":
        return <textarea {...props}></textarea>;
      default:
        return <input {...props}></input>;
    }
  };
  return (
    <div className="inputfield">
      <label>{props?.label}</label>
      {type()}
    </div>
  );
};

export default InputField;

import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import "./index.scss"
const Loader = ({ children, isActive, text }) => {
  return (
    <LoadingOverlay
      active={isActive??true}
      spinner
      text={text??"Loading ..."}
      className="loader"
    >
      {children}
    </LoadingOverlay>
  );
};

export default Loader;

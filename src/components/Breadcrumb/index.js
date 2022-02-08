import React from "react";
import "./index.scss";

const Breadcrumb = (props) => {
  const path = props.pathname.split("/")[1];
  return (
    <div className="row">
      <div className="breadcrumb">
        <div className="breadcrumb__list">
          {path === "" ? (
            <p className="breadcrumb__link">HOME</p>
          ) : (
            <p className="breadcrumb__link">{path.toUpperCase()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

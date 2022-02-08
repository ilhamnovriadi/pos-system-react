import React from "react";
import "./index.scss";

const Navigate = () => {
  return (
    <div className="navigate">
      <div className="navigate__list">
        <div className="navigate__page">
          <p>1</p>
        </div>
        <div className="navigate__page">
          <p>2</p>
        </div>
        <div className="navigate__page navigate__page--last navigate__page--active">
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Navigate;

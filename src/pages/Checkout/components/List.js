import React from "react";

export const List = ({ label, value, children, strong }) => {
  return (
    <div className="checkout__total">
      <p style={{ fontWeight: strong ? "bold" : "none" }}>{label}</p>
      <h3>{value}</h3>
      {children}
    </div>
  );
};

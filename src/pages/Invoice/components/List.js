import React from "react";

export const List = ({ label, value, children }) => {
  return (
    <div className="invoice__total">
      <p>{label}</p>
      <h3>{value ?? ""}</h3>
      {children}
    </div>
  );
};

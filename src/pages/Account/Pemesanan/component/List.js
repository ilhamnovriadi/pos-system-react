import React from "react";

export const List = ({ label, value, children }) => {
  return (
    <div className="pemesanan__col">
      <p className="pemesanan__label">{label}</p>
      <p className="pemesanan__desc">{value ?? ""}</p>
      {children}
    </div>
  );
};

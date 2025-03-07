import React from "react";

const Card = ({ children }) => {
  return <div className="border rounded-lg p-4 shadow-md bg-white">{children}</div>;
};

export default Card;

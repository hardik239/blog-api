import React from "react";
import Card from "../components/Card";

const Cards = () => {
  return (
    <div className="container my-5 pb-3">
      <h1 className="text-center py-2 mb-5">
        <span className="headings">Top Articles </span>
      </h1>
      <Card />
      {/* <Card /> */}
    </div>
  );
};

export default Cards;

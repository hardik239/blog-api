import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const { posts } = useSelector((state) => state.PostReducer);

  return (
    <div className="container  pt-5 pb-3">
      <h1 className="text-center py-2 mb-5">
        <span className="headings">Top Articles </span>
      </h1>
      {posts?.length === 0 ? (
        <div className="my-5 pt-5 d-flex justify-content-center align-items-center">
          <img src="/images/Spinner.gif" alt="Loading...." />
        </div>
      ) : (
        <div className="row g-2">
          {posts?.map((post) => {
            return <Card key={post._id} post={post} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;

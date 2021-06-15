import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Cards = () => {
  const { posts } = useSelector((state) => state.PostReducer);

  return (
    <div className="container  pt-5 pb-3">
      <h1 className="text-center py-2 mb-5">
        <span className="headings">Top Articles </span>
      </h1>
      <div className="row g-0 mx-2 mx-md-5">
        {posts.map((post) => {
          return <Card key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Cards;

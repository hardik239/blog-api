import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // ES6

const Test = () => {
  const post = useSelector((state) => state.publishPost);
  return (
    <div
      className="container-fluid cover-image"
      style={{ background: `url(./images/${post.image || "blog-bg.jpg"})` }}>
      <div className="container">
        <div className="row mb-5 px-3">
          <div className="col-12 cover-margin p-4 card mx-auto">
            <div>
              <h1 className="p-0">{post.title}</h1>
              <span className="time-text">
                Posted on {post.createdAt} by Hardik Thakor
              </span>
            </div>
            <div className="d-flex my-3">
              {post.categories.map((category) => {
                return (
                  <span
                    key={category}
                    className="badge bg-light text-dark me-2 text-uppercase">
                    {category}
                  </span>
                );
              })}
            </div>
            <ReactQuill
              className="bg-white editor"
              value={JSON.parse(post?.body)}
              theme="bubble"
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

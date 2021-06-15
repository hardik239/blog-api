import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Link } from "react-router-dom";

const Preview = () => {
  const { draftPost: post } = useSelector((state) => state.PostReducer);
  useEffect(() => {
    const nav = document.getElementById("navbar-section");
    nav.classList.add("hide");
    return () => {
      nav.classList.remove("hide");
    };
  }, []);
  return (
    <div
      className="container-fluid cover-image position-relative"
      style={{
        backgroundImage: `url(${post?.image})`
      }}>
      <div className="preview-tag">preview</div>
      <div className="container pb-3">
        <div className="row mb-5 px-3">
          <div className="col-12 cover-margin p-4 card mx-auto">
            <div>
              <div className="">
                <h1 className="p-0 text-wrap" style={{ width: "90%" }}>
                  {post?.title}
                </h1>
              </div>
              <span className="time-text">
                Posted on {post?.createdAt} by Hardik Thakor
              </span>
            </div>
            <div className="d-flex my-3">
              {post?.categories?.map((category) => {
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
              value={post?.body}
              theme="bubble"
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

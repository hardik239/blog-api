import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { FaBookmark, FaRegBookmark, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  DeletePost,
  SaveAndUnsavePost
} from "../store/AsyncActions/PostActions";
import Comment from "../components/Comment";

const SinglePost = ({ location }) => {
  const post = location.state;

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [isSaveClick, setIsSaveClick] = useState("FaRegBookmark");

  const history = useHistory();

  useEffect(() => {
    if (post._id) {
      setIsLoading(false);
    }
  }, [post._id]);

  if (isLoading) {
    return (
      <div className="mt-5 pt-5 d-flex justify-content-center align-items-center">
        <img src="/images/Spinner.gif" alt="Loading...." />
      </div>
    );
  }

  const handleEdit = () => {
    history.push({
      pathname: "/edit-post",
      state: post
    });
  };

  const handleDelete = () => {
    dispatch(DeletePost(post._id, history));
  };

  const handleSaveAndUnsave = (name) => {
    setIsSaveClick(name);
    if (user.username) {
      dispatch(SaveAndUnsavePost(post._id));
    } else {
      history.push({
        pathname: "/sign-in"
      });
    }
  };

  return (
    <div
      className="container-fluid cover-image"
      style={{ background: `url(/images/${post.image})` }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-10 cover-margin p-4 card mx-auto">
            <div>
              <div className="d-flex flex-column flex-md-row align-items-md-center">
                <h1 style={{ width: "90%" }} className="w-100 pe-2 text-wrap">
                  {post?.title}
                </h1>
                <div className="d-flex flex-start">
                  {user._id === (post.userId._id || post.userId) ? (
                    <div className="bookmark-icons d-flex align-items-md-center">
                      <FaEdit
                        size={22}
                        style={{ marginRight: "10px" }}
                        onClick={handleEdit}
                        color="green"
                      />
                      <FaTrashAlt
                        size={22}
                        style={{ marginRight: "10px" }}
                        onClick={handleDelete}
                        color="red"
                      />
                    </div>
                  ) : null}
                  <div className="bookmark-icons ms-0 ms-md-auto mt-0">
                    {user?.savedPosts?.includes(post._id) ? (
                      <FaBookmark
                        onClick={() => handleSaveAndUnsave("FaRegBookmark")}
                        size={20}
                      />
                    ) : (
                      <FaRegBookmark
                        onClick={() => handleSaveAndUnsave("FaBookmark")}
                        size={20}
                      />
                    )}
                  </div>
                </div>
              </div>
              <span className="time-text">
                Posted on {moment(post?.createdAt).format("MMMM DD, YYYY ")}
                by {post?.userId?.username}
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
            <div className="descridivtion lh-base fs-5 mb-4">
              <ReactQuill
                className="bg-white editor"
                value={JSON.parse(post?.body)}
                theme="bubble"
                readOnly={true}
              />
            </div>
          </div>
        </div>

        <Comment postId={post._id} />
      </div>
    </div>
  );
};

export default SinglePost;

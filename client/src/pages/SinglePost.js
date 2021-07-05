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

const SinglePost = ({ location }) => {
  const post = location.state;
  console.log(post);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const [isSaveClick, setIsSaveClick] = useState("FaRegBookmark");
  const dispatch = useDispatch();

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
    if (user.username) {
      setIsSaveClick(name);
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
        <div className="row mb-5 pb-5">
          <div className="col-12 col-md-10 mx-auto card bg-light">
            <div className="card-body">
              <form className="mb-4">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Join the discussion and leave a comment!"></textarea>
              </form>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle"
                    src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="..."
                  />
                </div>
                <div className="ms-3">
                  <div className="fw-bold">Commenter Name</div>
                  If you're going to lead a space frontier, it has to be
                  government; it'll never be private enterprise. Because the
                  space frontier is dangerous, and it's expensive, and it has
                  unquantified risks.
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                        alt="..."
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      And under those conditions, you cannot establish a
                      capital-market evaluation of that enterprise. You can't
                      get investors.
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                        alt="..."
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      When you put money directly to a problem, it makes a good
                      headline.
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle"
                    src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="..."
                  />
                </div>
                <div className="ms-3">
                  <div className="fw-bold">Commenter Name</div>
                  When I look at the universe and all the ways the universe
                  wants to kill us, I find it hard to reconcile that with
                  statements of beneficence.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

import React, { useState } from "react";
import { useHistory } from "react-router";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { SaveAndUnsavePost } from "../store/AsyncActions/PostActions";

function extractContent(html) {
  return trimDescription(
    new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent
  );
}

const avatarGenerateUrl = "https://ui-avatars.com/api/?background=random&name=";

function trimDescription(string) {
  const length = 80;
  let trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;

  return trimmedString;
}

const Card = ({ post }) => {
  const history = useHistory();

  const { user } = useSelector((state) => state.AuthReducer);

  const username = post.userId.username || user.username;

  const dispatch = useDispatch();

  const [isSaveClick, setIsSaveClick] = useState("FaRegBookmark");

  const redirectToDetailPost = () => {
    history.push({
      pathname: "/single-post",
      state: post
    });
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
    <div className="col-md-4 mx-auto d-flex mb-5 justify-content-center align-items-stretch">
      <div
        className="card shadow"
        style={{
          width: "21rem",
          borderRadius: "15px"
        }}>
        <img
          src={`/images/${post.image}`}
          className="card-img-top mb-3 "
          onClick={redirectToDetailPost}
          style={{
            borderRadius: "15px",
            height: "200px",
            backgroundSize: "cover"
          }}
          alt="..."
        />
        <div className="card-body">
          <h5
            className=" card-title mb-3"
            onClick={() => redirectToDetailPost(post._id)}>
            {post.title}
          </h5>
          <div className="inline-block b-0 card-text">
            {extractContent(JSON.parse(post.body))}
          </div>
        </div>
        <div className="card-footer bg-transparent border-0 user-section  d-flex justify-content-between align-itmes-center">
          <div className="d-flex justify-content-center align-itmes-center">
            <img
              src={`${avatarGenerateUrl}${username}`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px"
              }}
              alt="avatar"
            />
            <div className="">
              <div style={{ fontSize: "12px" }}>
                {username}
                {username === user.username ? " (You)" : ""}
              </div>
              <div style={{ fontSize: "10px" }}>
                {moment(post.createdAt).format("MMM-DD")}
              </div>
            </div>
          </div>
          <div className="bookmark-icons mt-2">
            <div className="d-flex align-items-center">
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
      </div>
    </div>
  );
};

export default Card;

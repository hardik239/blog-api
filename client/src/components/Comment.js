import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { secureStorage } from "../utils/SecureStorage";
import swal from "sweetalert";

const token = secureStorage.getItem("token");
const avatarGenerateUrl = "https://ui-avatars.com/api/?background=random&name=";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
};

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentPosted, setIsCommentPosted] = useState(false);

  const { user } = useSelector((state) => state.AuthReducer);

  const FetchComment = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/post/fetch-comment",
        { id: id },
        config
      );
      if (res.status === 200) {
        setComments(res.data.comments);
        setIsLoading(false);
      } else {
        swal({
          title: "!! Warnign !!",
          text: res.data.msg,
          icon: "info"
        });
      }
    } catch (error) {
      swal({
        title: "!! Warnign !!",
        text: error.message,
        icon: "info"
      });
    }
  };

  useEffect(() => {
    FetchComment(postId);
  }, [postId, isCommentPosted]);

  const handleComment = (e) => {
    setPostComment(e.target.value);
  };

  const postCommentHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/post/post-comment",
        {
          postId,
          comment: postComment
        },
        config
      );
      if (res.status === 200) {
        swal({
          title: "!! Success !!",
          text: res.data.msg,
          icon: "success"
        });
        setIsCommentPosted(!isCommentPosted);
        setPostComment("");
      } else {
        swal({
          title: "!! Warnign !!",
          text: res.data.msg,
          icon: "info"
        });
      }
    } catch (error) {
      swal({
        title: "!! Warnign !!",
        text: error.message,
        icon: "info"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mt-5 pt-5 d-flex justify-content-center align-items-center">
        <img src="/images/Spinner.gif" alt="Loading...." />
      </div>
    );
  }

  return (
    <div className="row mb-5 pb-5">
      <div className="col-12 col-md-10 mx-auto card bg-light">
        <div className="card-body">
          {user.username && (
            <form className="mb-4" onSubmit={postCommentHandle}>
              <textarea
                className="form-control"
                rows="3"
                name="postComment"
                value={postComment}
                onChange={handleComment}
                placeholder="Leave a comment!"></textarea>
              <button className="btn btn-primary mt-3" type="submit">
                Post a Comment
              </button>
            </form>
          )}

          {comments.length === 0 && (
            <div className="my-3 py-3 d-flex justify-content-center align-items-center">
              <h4>No Commnets Yet..</h4>
            </div>
          )}
          {comments.map((comment) => {
            return (
              <div key={comment._id} className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={`${avatarGenerateUrl}${comment.author}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px"
                    }}
                    alt="avatar"
                  />
                </div>
                <div className="ms-3">
                  <div className="fw-bold">{comment.author}</div>
                  {comment.comment}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;

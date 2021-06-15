import React, { useState } from "react";
import { useHistory } from "react-router";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import moment from "moment";
import { parse } from "node-html-parser";

function extractContent(html) {
  return trimDescription(
    new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent
  );
}

const avatarGenerateUrl = "https://ui-avatars.com/api/?background=random&name=";

// https://ui-avatars.com/api/?name=hardik&background=random

function trimDescription(string) {
  const length = 80;
  let trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;

  return trimmedString;
}

const Card = ({ post }) => {
  const history = useHistory();

  const [isSaveClick, setIsSaveClick] = useState("FaRegBookmark");

  const redirectToDetailPost = (id) => {
    history.push(`/single-post/${id}`);
  };

  return (
    <div className="col-md-4 d-flex mb-5 align-items-stretch">
      <div
        className="card shadow"
        style={{
          width: "21rem",
          borderRadius: "15px"
        }}>
        <img
          src={`/images/${post.image}`}
          className="card-img-top mb-3 "
          onClick={() => redirectToDetailPost(post._id)}
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
              src={`${avatarGenerateUrl}${post.userId.username}`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px"
              }}
              alt="avatar"
            />
            <div className="">
              <div style={{ fontSize: "12px" }}>{post?.userId.username}</div>
              <div style={{ fontSize: "10px" }}>
                {moment(post.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="bookmark-icons">
            {isSaveClick === "FaBookmark" ? (
              <FaBookmark
                onClick={() => setIsSaveClick("FaRegBookmark")}
                size={20}
              />
            ) : (
              <FaRegBookmark
                onClick={() => setIsSaveClick("FaBookmark")}
                size={20}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//   return (
//     <>
//       <div
//         className="row mb-5 p-3 mx-2 mx-md-0 gap-4 gap-md-0  shadow"
//         style={{ borderRadius: "5px" }}>
//         <div
//           className="col-md-7 card-image"
//           onClick={() => history.push("/single-post")}
//           style={{
//             background: `url(./images/${post.image})`
//           }}></div>
//         <div className="col-md-5 ps-5 d-flex justify-content-between flex-column">
//           <div>
//             <h1
//               className="post-title"
//               onClick={() => history.push("/single-post")}>
//               {post.title}
//             </h1>
//             <span className="time-text ">
//               {moment(post.createdAt).fromNow()}
//             </span>
//           </div>
//           <div className="d-flex">
//             {post?.categories?.map((category) => {
//               return (
//                 <span
//                   key={category}
//                   className="badge bg-white text-dark me-2 text-uppercase">
//                   {category}
//                 </span>
//               );
//             })}
//           </div>
//           <div className="description mb-1">
//             {extractContent(JSON.parse(post.body))}
//           </div>
//           <div className="">
//             {/* <FaBookmark size={20} /> */}
//             <FaRegBookmark size={20} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default Card;

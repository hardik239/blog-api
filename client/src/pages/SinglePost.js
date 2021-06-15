import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function extractContent(html) {
  return new DOMParser().parseFromString(html, "text/html").documentElement
    .textContent;
}

function trimDescription(string) {
  const length = 80;
  let trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;

  return trimmedString;
}

const SinglePost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/post/single/${id}`);

      if (res.status === 200 && res.data.post) {
        setPost(res.data.post);
        setIsLoading(false);
        console.log(res.data.post);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (isLoading) return <div>Loading....</div>;
  return (
    <div
      className="container-fluid cover-image"
      style={{ background: `url(/images/${post.image})` }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-10 cover-margin p-4 card mx-auto">
            <div>
              <h1 className="p-0">{post?.title}</h1>
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

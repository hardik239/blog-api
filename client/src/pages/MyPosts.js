import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const MyPosts = () => {
  const { user, token } = useSelector((state) => state.AuthReducer);

  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const res = await axios.post(
          "http://localhost:5000/post/fetch-user-posts",
          { id: user._id },
          config
        );

        if (res.status === 200) {
          setMyPosts(res.data.myPosts);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchUserPosts();
  }, [user._id]);

  if (isLoading) {
    return (
      <div className="mt-5 pt-5 d-flex justify-content-center align-items-center">
        <img src="/images/Spinner.gif" alt="Loading...." />
      </div>
    );
  }

  return (
    <div className="container pt-5 pb-3">
      {myPosts.length === 0 && !isLoading ? (
        <div className="row mt-5 mt-md-2 g-0 mx-2 mx-md-5">
          <div className="col-md-5 mx-auto">
            <img
              src="/images/noCategoryPost.svg"
              className="img-fluid px-5 mt-5"
              alt="No Posts"
            />
            <div className="text-center mt-5 fs-2 fw-bold">
              You Don't Have Any Post
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center mt-3 py-2 mb-5">
            <span className="headings">My Posts </span>
          </h1>
          <div className="row g-0 mx-2 mx-md-5">
            {myPosts.map((post) => {
              return <Card key={post._id} post={post} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyPosts;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const categories = [
  "Technology",
  "Travel",
  "Fashion",
  "LifeStyle",
  "Sports",
  "News",
  "Movie",
  "Personal",
  "All"
];

const FilterPost = () => {
  const { posts } = useSelector((state) => state.PostReducer);
  const [userCategoriesPost, setUserCategoriesPost] = useState(posts);

  useEffect(() => {
    setUserCategoriesPost(posts);
  }, []);

  const handleCategoryChange = (category) => {
    if (category === "All") setUserCategoriesPost(posts);
    else {
      let tempArray = posts.filter((post) => {
        return post.categories.includes(category);
      });
      setUserCategoriesPost(tempArray);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto d-flex justify-content-between flex-wrap">
          {categories.map((category) => {
            return (
              <button
                key={category}
                className="btn m-1 btn-outline-primary"
                onClick={() => handleCategoryChange(category)}>
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="row mt-5 g-2">
        {userCategoriesPost.length === 0 ? (
          <>
            <div className="mt-2 d-flex justify-content-center align-items-center">
              <img
                src="/images/noCategoryPost.svg"
                style={{ maxHeight: "25rem", maxWidth: "20rem" }}
                alt="no data found...."
                className="px-5 px-md-0"
              />
            </div>
            <h6 className="text-center fs-2 fw-bold mt-3">
              Ups!... no results found
            </h6>
          </>
        ) : (
          userCategoriesPost?.map((post) => {
            return <Card key={post._id} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default FilterPost;

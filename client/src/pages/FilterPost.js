import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const categories = [
  "Technology",
  "Travel",
  "Fashion",
  "Food",
  "Music",
  "LifeStyle",
  "Fitness",
  "Sports",
  "News",
  "Movie",
  "Personal",
  "Bussiness",
  "Gaming"
];

const FilterPost = () => {
  const [userCategory, setUserCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const { posts } = useSelector((state) => state.PostReducer);
  const [userCategoriesPost, setUserCategoriesPost] = useState(posts);

  const handleCategoryChange = (e) => setUserCategory(e.target.value);

  useEffect(() => {
    let tempArray = posts.filter((post) => {
      return post.categories.includes(userCategory);
    });
    setIsLoading(false);
    setUserCategoriesPost(tempArray);
  }, [userCategory]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <select
            onChange={handleCategoryChange}
            name="userCategory"
            defaultValue="all"
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example">
            <option value="all" disabled>
              Choose Category
            </option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {userCategoriesPost.length === 0 && userCategory !== "all" ? (
        <div className="text-center mt-5 fw-bold fs-1">No Result Found</div>
      ) : userCategory !== "all" ? (
        <div className="row mt-5 g-2">
          {userCategoriesPost?.map((post) => {
            return <Card key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <div className="text-center mt-5 fw-bold fs-1">
          No Category Selected
        </div>
      )}
    </div>
  );
};

export default FilterPost;

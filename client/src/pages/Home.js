import React from "react";
import Cards from "./Cards";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="banner-image w-100 shadow vh-100 d-flex justify-content-center align-items-center">
        <div className="content mt-5">
          <h5 className="text-white text-center fs-3">
            Welcome To Ultimate Blog
          </h5>
          <h1 className="fs-1" style={{ color: "orange" }}>
            Where good ideas find you.
          </h1>
        </div>
      </div>
      <Cards />
      <Footer />
    </>
  );
};

export default Home;

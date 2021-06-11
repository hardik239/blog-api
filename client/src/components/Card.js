import React from "react";
import { useHistory } from "react-router";

const Card = () => {
  const history = useHistory();
  return (
    <>
      <div className="row mb-5">
        <div
          className="col-md-7 card-image"
          onClick={() => history.push("/single-post")}
          style={{
            background:
              'url("https://preview.colorlib.com/theme/readit/images/ximage_1.jpg.pagespeed.ic.ndb4JOHu-q.webp")'
          }}></div>
        <div className="col-md-5 ps-5 d-flex justify-content-between flex-column">
          <div>
            <h1
              className="post-title"
              onClick={() => history.push("/single-post")}>
              Build a website in minutes with Adobe Templates
            </h1>
            <span className="time-text ">1 hour Ago</span>
          </div>
          <div className="d-flex">
            <span className="badge bg-light text-dark me-2 text-uppercase">
              Technology
            </span>
            <span className="badge bg-light text-dark me-2 text-uppercase">
              Javascript
            </span>
          </div>
          <div className="description mb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A rem iure
            commodi neque exercitationem itaque facilis natus molestias labore,
            doloribus expedita excepturi recusandae dolor aperiam aut mollitia
            doloremque. Beatae officia ullam perspiciatis, natus quaerat
            voluptatem laboriosam expedita excepturi recusandae dolor aperiam
            aut mollitia doloremque. Beatae officia ullam perspiciatis, natus
            quaerat voluptatem laboriosam.
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div
          className="col-md-7 card-image"
          style={{
            background:
              'url("https://preview.colorlib.com/theme/readit/images/ximage_2.jpg.pagespeed.ic.pkTf90Znlu.webp")'
          }}></div>
        <div className="col-md-5 ps-5 d-flex justify-content-between flex-column">
          <div>
            <h1 className="post-title">
              Build a website in minutes with Adobe Templates
            </h1>
            <span className="time-text ">1 hour Ago</span>
          </div>
          <div className="d-flex">
            <span className="badge bg-light text-dark me-2 text-uppercase">
              Technology
            </span>
            <span className="badge bg-light text-dark me-2 text-uppercase">
              Javascript
            </span>
          </div>
          <div className="description mb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A rem iure
            commodi neque exercitationem itaque facilis natus molestias labore,
            doloribus expedita excepturi recusandae dolor aperiam aut mollitia
            doloremque. Beatae officia ullam perspiciatis, natus quaerat
            voluptatem laboriosam expedita excepturi recusandae dolor aperiam
            aut mollitia doloremque. Beatae officia ullam perspiciatis, natus
            quaerat voluptatem laboriosam.
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

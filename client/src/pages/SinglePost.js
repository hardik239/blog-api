import React from "react";

const SinglePost = () => {
  return (
    <div
      className="container-fluid cover-image"
      style={{ background: 'url("./images/blog-bg.jpg")' }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-10 cover-margin p-4 card mx-auto">
            <div>
              <h1 className="p-0">
                Build a website in minutes with Adobe Templates
              </h1>
              <span className="time-text">
                Posted on January 1, 2021 by Hardik Thakor
              </span>
            </div>
            <div className="d-flex my-3">
              <span className="badge bg-light text-dark me-2 text-uppercase">
                Technology
              </span>
              <span className="badge bg-light text-dark me-2 text-uppercase">
                Javascript
              </span>
            </div>
            <p className="description lh-base fs-5 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A rem
              iure commodi neque exercitationem itaque facilis natus molestias
              labore, doloribus expedita excepturi recusandae dolor aperiam aut
              mollitia doloremque. Beatae officia ullam perspiciatis, natus
              quaerat voluptatem laboriosam expedita excepturi recusandae dolor
            </p>
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

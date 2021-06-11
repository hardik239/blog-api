import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="container">
      <div className="row mx-1">
        <div className="col-md-5 login-box mx-auto">
          <div className="mt-3">
            <img src="./images/avatar.png" alt="avatar" className="avatar" />
          </div>
          <div className="login-title">Contcat Us</div>
          <div className="login-form">
            <form>
              <div className="form-group">
                <label className="form-control-label">NAME</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-control-label">EMAIL</label>
                <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-control-label">MESSAGE</label>
                <textarea className="form-control"></textarea>
              </div>
              <div className="mx-auto text-center mb-4">
                <button
                  type="submit"
                  className="w-100 btn button-primary text-center">
                  Send Query
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

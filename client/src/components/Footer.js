import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark footer ">
      <div className="row py-2">
        <p className="footer-text fs-6 mb-0">
          Copyright © Ultimate <span style={{ color: "orange" }}>Blog </span>
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;

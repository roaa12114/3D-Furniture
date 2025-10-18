import "./footer.css";
import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa"; // Import specific icons

const Footer = () => {
  return (
    <div className="footer-container">
    <footer id="footer">
      <h1 className="text-center">Furniture</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ab?
      </p>
      <div className="icons text-center">
        <FaTwitter />
        <FaFacebook />
        <FaGoogle />
        <FaInstagram />
      </div>
      <div className="copyright text-center">
        &copy; Copyright{" "}
        <strong>
          <span>Furniture</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credite text-center">
        Designed By <a href=" ">SA Coding</a>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Footer.css"

function Footer() {
  return (
    <footer className="py-4">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Left Section: Copyright */}
          <div className="col-auto text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white">
              © Copyright 2025 StayHub. | All Rights Reserved.
            </p>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="col-auto text-center">
            <div className="d-flex justify-content-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a
                href="mailto:your-stayhub@example.com" // Replace with your Gmail or email
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Gmail"
              >
                <i className="bi bi-envelope fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

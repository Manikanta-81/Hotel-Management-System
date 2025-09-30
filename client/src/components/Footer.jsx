import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="professional-footer">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-section">
              <h5 className="footer-title">StayHub</h5>
              <p className="footer-description">
                Experience luxury and comfort at its finest. Book your perfect stay with us and create unforgettable memories.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="mailto:stayhub@example.com" className="social-link">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Quick Links</h6>
              <ul className="footer-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/viewrooms">Rooms</Link></li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Services</h6>
              <ul className="footer-links">
                <li><a href="#booking">Room Booking</a></li>
                <li><a href="#amenities">Amenities</a></li>
                <li><a href="#dining">Dining</a></li>
                <li><a href="#events">Events</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Contact Info</h6>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>48 stay Hotel Street, Bengaluru, Karnataka 520007</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+91 9876543210</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>info@stayhub.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © 2025 StayHub. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-bottom-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

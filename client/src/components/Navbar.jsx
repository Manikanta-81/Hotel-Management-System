import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import  "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the token exists

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token"); // Clear the token
      toast.success(
        " Logout successfully !\nRemoved JWT Token successfully \n Kindly login :)"
      );
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 3000); // 2000 milliseconds = 2 seconds
    } else {
      toast.error("Please log in first. No token found! ");
    }
  };
  return (
    <div>
      <ToastContainer position="top-center" />

      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            StayHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-white">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>

              {token ? (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success text-white nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign up
                    </Link>
                  </li> */}
                </>
              )}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/customer">
                  Customer
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/viewrooms">
                  Rooms
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/createroom">
                  Create Rooms
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

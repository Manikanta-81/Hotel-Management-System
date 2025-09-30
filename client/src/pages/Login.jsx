import React, { useState } from "react";
import Layout from "../components/Layout";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  <ToastContainer position="top-center" />;
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const formObj = { email, password };
    console.log(formObj);

    axiosInstance
      .post("/users/login-user", formObj)

      .then((res) => {
        console.log(res);

        const token = res.data.token; // Capture the token from the response data
        console.log("Token received:", token); // Check if the token is returned from the backend

        const userRole = res.data.user.role;
        console.log("User role:", userRole);

        if (token) {
          localStorage.setItem("token", token); // Store the token in the browser's localStorage
          toast.success("User/Admin login successfully");

          if (userRole === 2) {
            toast.success("Admin/staff login successfull. Kindly add Rooms");
            setTimeout(() => navigate("/createroom"), 3000);
          } else if (userRole === 1) {
            // If the role is CUSTOMER (1), check if customer data exists
            if (res.data.customerExists) {
              setTimeout(() => navigate("/viewrooms"), 1000);
            } else {
              toast.info("Kindly add the customer data for booking generation");
              setTimeout(() => navigate("/customer"), 3000);
            }
          }
        }
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
          // Show server error message
        } else {
          console.log("Error", err);
          alert("Error in login. Please try again. ");
        }
      });
  }

  return (
    <Layout>
      <div className="login-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="login-card">
                <div className="login-header">
                  <h1 className="login-title">Welcome Back</h1>
                  <p className="login-subtitle">Sign in to your StayHub account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  {message && (
                    <div className="alert alert-danger">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {message}
                    </div>
                  )}

                  <button type="submit" className="btn btn-login">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </button>

                  <div className="login-footer">
                    <p className="text-center">
                      Don't have an account?{" "}
                      <Link to="/signup" className="signup-link">
                        Create one here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

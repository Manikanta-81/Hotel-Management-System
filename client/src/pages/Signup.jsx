import React, { useState } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Signup.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Initialize useNavigate hook
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formObj = { name, email, password, confirmPassword };
    console.log(formObj);

    setMessage("");

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // return regex.test(email);
      return regex.test(email.trim());
    };

    // Check for valid email format
    if (!validateEmail(email)) {
      setMessage("Invalid email format.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    axiosInstance
      .post("/users/register-user", formObj)

      .then((res) => {
        console.log(res);
        alert("User Signup Successful");

        // After successful signup, redirect to login page
        navigate("/login"); // Redirect to login page
      })

      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setMessage("User already exists. Please try logging in."); // Specific error
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          alert(err.response.data.message); // Show server error message
        } else {
          console.log("Error", err);
          alert("Error in Signup please try again ");
        }
      });
  }

  return (
    <Layout>
      <div className="signup-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="signup-card">
                <div className="signup-header">
                  <h1 className="signup-title">Create Account</h1>
                  <p className="signup-subtitle">Join StayHub and start your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <i className="bi bi-person me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>

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
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <small className="form-text">Password must be at least 6 characters long</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />
                  </div>

                  {message && (
                    <div className="alert alert-danger">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {message}
                    </div>
                  )}

                  <button type="submit" className="btn btn-signup">
                    <i className="bi bi-person-plus me-2"></i>
                    Create Account
                  </button>

                  <div className="signup-footer">
                    <p className="text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="login-link">
                        Sign in here
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

export default Signup;

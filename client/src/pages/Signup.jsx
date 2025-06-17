import React, { useState } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
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
        if (err.response.status === 409) {
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
    <div>
      <Layout>
        <div className="container rounded-4 card shadow-lg w-50  "style={{border: "5px solid lightslategray" }}>
          <h1 className="text-center mb-3">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            {/* Name  */} 
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                aria-label="Full Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
            </div>
            {/* Email  */}
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your Email address"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            {/* password  */}
            <div className="form-group mt-3">
              <label htmlFor="password"> Set Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            {/* confirmPassword */}
            <div className="form-group mt-3">
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                required
              />
            </div>
            {/* Error message if email format not matched also password check */}
            {message && (
              <div className="alert alert-success bg-success text-white mt-2 p-2 ">
                {message}
              </div>
            )}

            {/* submit button  */}
            <div className="form-group d-flex justify-content-center ">
              <input
                type="submit"
                className="btn btn-primary p-3 m-3  rounded-4 "
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Signup;

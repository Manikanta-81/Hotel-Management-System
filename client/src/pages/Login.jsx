import React, { useState } from "react";
import Layout from "../components/Layout";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

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
    <div>
      <Layout>
        <div
          className="container card shadow-lg  w-50  rounded-4"
          style={{ border: "5px solid lightslategray" }}
        >
          <h1 className="text-center mb-3">Log in </h1>
          <form onSubmit={handleSubmit}>
            {/* Email  */}
            <div className="form-group">
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your Login password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>

            {/* setMessage */}

            {message && (
              <div className="alert alert-success bg-success text-white mt-3 p-2 ">
                {message}
              </div>
            )}

            {/* Registration link for new users */}
            <div className="text-center mt-3">
              <p className="text-success">
                Not registered yet?{" "}
                <Link to={`/signup`} className="text-primary">
                  Create an account here
                </Link>
                .
              </p>
            </div>

            <div className="form-group d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="btn btn-primary p-3 m-3 rounded-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formObj = { email, password };
    console.log(formObj);

    axios
      .post("http://localhost:8000/users/login-user", formObj)

      .then((res) => {
        console.log(res);
        alert("User login successfully");
        navigate("/home");
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
        <div className="container card shadow-lg  w-50 border border-5 border-success rounded-4">
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
              <div className="alert alert-success bg-success text-white mt-2 p-2 ">
                {message}
              </div>
            )}

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

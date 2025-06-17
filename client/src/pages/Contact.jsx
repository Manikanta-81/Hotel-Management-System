import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Contact.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please log in to send a message.");
      setTimeout(() => navigate("/login"), 2500); // Redirect to login page
      return;
    }
    const formObj = {
      name,
      email,
      phone,
      message,
    };

    console.log(formObj);

    axiosInstance
      .post("/contact/savecontact", formObj)
      .then((res) => {
        console.log(res);
        // toast.success("Your Message has been sent successfully!");

        // Reset the form fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => {
          toast.success("Your Message has been sent successfully!");
        }, 500);

      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <Layout>
      <div className="contact-page" style={{ marginTop: "-3.5rem" }}>
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We're here to assist you. Feel free to reach out!</p>
        </div>

        <div className="contact-content">
          <section className="contact-form-section">
            <h2>Get in Touch</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tele"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  placeholder="Type your message here"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </section>

          <section className="contact-info-section">
            <h2>Our Location</h2>
            <p>
              <strong>Address: </strong>
              36th Cross Rd, 1st floor, Stayhub chambers 4th Block Jayanagar,
              Bengaluru, Karnataka 560041
            </p>
            <p>
              <strong>Phone:</strong> +91 9108105199
            </p>
            <p>
              <strong>Email:</strong> info@stayhub.com | balaji@stayhub.com |
              mani@stayhub.com |
            </p>

            <div className="map-container">
              <iframe
                title="Hotel Location"
                width="600"
                height="400"
                src="https://tinyurl.com/googlemap-stayhub"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </Layout>
  );
};

export default Contact;

import React from "react";
import Layout from "../components/Layout";

function About() {
  return (
    <div>
      <Layout>
        <section className="about-us-section py-5 bg-light  " style={{marginTop:"-4rem",marginBottom:"-4rem"}}>
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4">About StayHub</h1>
              <p className="lead text-muted">
                Redefining Hospitality Management with Innovation and Excellence
              </p>
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-md-6">
                <img
                  src="/images/hoteloverview.png"
                  alt="StayHub Overview"
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "600px" }}
                />
              </div>
              <div className="col-md-6">
                <h3>Who We Are</h3>
                <p>
                  StayHub is a cutting-edge hotel management platform dedicated
                  to transforming the hospitality industry. By integrating
                  advanced technology with user-centric design, StayHub empowers
                  hotels to streamline operations, enhance guest satisfaction,
                  and deliver unparalleled service excellence.
                </p>
                <p>
                  Our mission is to simplify the complexities of hotel
                  management while providing an exceptional experience for both
                  staff and guests. Whether you're managing room bookings or
                  delivering personalized guest services, StayHub is your
                  trusted partner in hospitality success.
                </p>
              </div>
            </div>

            <div className="features-section py-4">
              <h3 className="text-center mb-4">Key Features</h3>
              <div className="row">
                <div className="col-md-4 text-center">
                  <i className="bi bi-shield-lock display-4 text-primary"></i>
                  <h5 className="mt-3">Secure User Authentication</h5>
                  <p>
                    Role-based authentication ensures secure access for both
                    staff and guests, protecting sensitive information.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="bi bi-house-door display-4 text-primary"></i>
                  <h5 className="mt-3">Efficient Room Management</h5>
                  <p>
                    Real-time updates on room availability, pricing, and status
                    ensure seamless room management and optimized occupancy.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="bi bi-calendar-check display-4 text-primary"></i>
                  <h5 className="mt-3">Real-Time Bookings</h5>
                  <p>
                    Guests can book instantly with real-time availability
                    updates, ensuring a hassle-free booking experience.
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4 text-center">
                  <i className="bi bi-person-lines-fill display-4 text-primary"></i>
                  <h5 className="mt-3">Comprehensive Customer Profiles</h5>
                  <p>
                    Keep track of customer preferences, booking history, and
                    personalized details to elevate guest satisfaction.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="bi bi-chat-left-text display-4 text-primary"></i>
                  <h5 className="mt-3">Feedback & Ratings</h5>
                  <p>
                    Collect valuable feedback from guests to continuously
                    improve services and enhance the guest experience.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="bi bi-bar-chart display-4 text-primary"></i>
                  <h5 className="mt-3">Data-Driven Insights</h5>
                  <p>
                    Gain actionable insights through analytics to make informed
                    decisions and drive operational efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="mission-section py-5">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3>Our Vision & Mission</h3>
                  <p>
                    At StayHub, we envision a future where hotel management is
                    seamless, efficient, and customer-centric. Our mission is to
                    empower the hospitality industry with tools and technology
                    that enhance both operational efficiency and guest
                    experiences.
                  </p>
                  <p>
                    We believe in creating meaningful connections between hotels
                    and their guests, ensuring every stay is memorable and
                    rewarding.
                  </p>
                </div>
                <div className="col-md-6">
                  <img
                    src="/images/Scrolling1.png"
                    alt="Our Mission"
                    className="img-fluid rounded shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default About;
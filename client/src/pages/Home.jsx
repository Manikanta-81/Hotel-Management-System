import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Carousel } from "react-bootstrap";
import "../styles/Home.css";

function Home() {
  // Hotel images with additional data
  const hotelImages = [
    {
      id: 1,
      src: "/images/luxury suite.png",
      alt: "Luxury Suite",
    },
    {
      id: 2,
      src: "/images/Beachview.png",
      alt: "Beachside Hotel",
    },
    {
      id: 3,
      src: "/images/Cityview.png",
      alt: "City View Hotel",
    },
    {
      id: 4,
      src: "/images/cozyroom.png",
      alt: "Cozy Room",
    },
    {
      id: 5,
      src: "/images/nightview.png",
      alt: "Poolside View",
    },
    {
      id: 6,
      src: "/images/gym.png",
      alt: "Gym View",
    },
    {
      id: 7,
      src: "/images/Scrolling1.png",
      alt: "Scrolling 1",
    },
    {
      id: 8,
      src: "/images/Scrolling2.png",
      alt: "Scrolling 2",
    },
    {
      id: 9,
      src: "/images/Scrolling3.png",
      alt: "gym 1",
    },
  ];

  // Carousel images for the hero section
  const carouselImages = [
    { src: "/images/Scrolling1.png", alt: "Beach Resort" },
    { src: "/images/Scrolling2.png", alt: "Mountain Escape" },
    { src: "/images/Scrolling3.png", alt: "Luxury Suite" },
    { src: "/images/Scrolling4.png", alt: "City Hotel" },
    { src: "/images/Scrolling5.png", alt: "Cozy Room" },
  ];

  const token = localStorage.getItem("token");

  return (
    <Layout>
      {/* Hero Section with Full-Width Carousel */}
      <section className="hero-section position-relative" style={{ marginTop: "-5rem" }}>
        <Carousel fade interval={3000} className="full-width-carousel">
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-image-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
                <div className="carousel-overlay"></div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Hero Text Overlay */}
        <div className="hero-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 text-center">
                <h1 className="hero-title">Welcome to StayHub</h1>
                <p className="hero-subtitle">Experience luxury and comfort at its finest</p>
                {token ? (
                  <Link to="/viewrooms" className="btn btn-primary btn-lg hero-btn">
                    <i className="bi bi-calendar-check me-2"></i>Book Now
                  </Link>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-lg hero-btn">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Login to Book Rooms
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <h2 className="section-title text-center mb-5">Explore Our Hotels</h2>
              <div className="row g-4">
                {hotelImages.map((hotel, index) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={index}>
                    <div className="hotel-card">
                      <div className="hotel-image-container">
                        <img
                          src={hotel.src}
                          alt={hotel.alt}
                          className="hotel-image"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Carousel } from "react-bootstrap"; // Import react-bootstrap Carousel

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
      {/* Hero Section with Bootstrap Carousel */}
      <section
        className="hero-section position-relative"
        style={{ marginTop: "-3.5rem", marginBottom: "3rem" }}
      >
        <Carousel fade interval={1000}>
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <Link to="/">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="d-block w-100"
                  style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "cover",
                    margin: " 0 auto", // center the image if width exceeds the container
                  }}
                />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Text stays fixed */}
        <div
          className="hero-text position-absolute top-50 start-50 translate-middle text-center text-white"
          style={{
            zIndex: 10, // Ensure it stays on top of the carousel
          }}
        >
          <h1 className="display-4">Welcome to StayHub</h1>
          <p className="lead">Experience luxury and comfort at its finest.</p>

          {token ? (
            <Link to="/viewrooms" className="btn btn-primary btn-lg mt-3">
              Book Now
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-lg mt-3">
             Login to Book Rooms
            </Link>
          )}
        </div>
      </section>

      {/* Gallery Section - Displaying Hotel Images Only */}
      <section className="container mt-5">
        <h3 className="text-center mb-4">Explore Our Hotels</h3>
        <div className="row g-4" style={{ marginBottom: "5rem" }}>
          {hotelImages.map((hotel, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={hotel.src}
                  alt={hotel.alt}
                  className="card-img-top"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";
import "../styles/RoomBooking.css";

function RoomBooking() {
  const { roomId } = useParams(); // Get room ID from the route params
  const [roomDetails, setRoomDetails] = useState(null);
  const [check_in_date, setCheckInDate] = useState("");
  const [check_out_date, setCheckOutDate] = useState("");

  const navigate = useNavigate();

  // Fetch room details using room ID when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`/rooms/getSingleRoom/${roomId}`)
      .then((res) => {
        setRoomDetails(res.data.room); // Store the room details in state
      })
      .catch((err) => {
        console.log("Error fetching room details:", err);
        alert("Error fetching room details.");
      });
  }, [roomId]);

  // Handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate check-in and check-out dates
    if (!check_in_date || !check_out_date) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    // Booking data
    const bookingData = {
      room_id: roomId,
      check_in_date,
      check_out_date,
    };

    console.log(bookingData);

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      alert("Unauthorized access.Please login.");
      navigate("/login");
    } else {
      // Decode token and check expiry
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedToken.exp < currentTime) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token"); // Remove expired token
        navigate("/login"); // Redirect to login page
      }
    }

    // Create booking using the booking data
    axiosInstance
      .post("/bookings/create-booking", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      })

      .then((res) => {
        console.log(res);
        const { bookingId, roomId } = res.data;
        alert(
          ` Booking created successfully!  \n Booking ID: ${bookingId} \n Hotel Name : ${roomDetails.hotel_name} \n Room ID: ${roomId} \n Redirecting to your confirmation ticket...`
        );
        setTimeout(() => {
          navigate(`/viewrooms/${roomId}/booking-confirm/${bookingId}`); // Redirect to the confirmation page
        }, 1000);

        // alert(res.data.message); // Show success message
      })
    
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          // If backend sends an error message, display it
          console.error("Error creating booking:", err.response.data.message);
          alert(err.response.data.message); // Show the backend message
        } else {
          // Handle unexpected errors (e.g., network issues)
          console.error("Error creating booking:", err);
          alert("Error creating booking. Please try again.");
        }
      });
      
  };

  return (
    <Layout>
      <div className="booking-page">
        <div className="container">
          <div className="booking-header">
            <h1 className="booking-title">Book Your Room</h1>
            <p className="booking-subtitle">Complete your reservation in just a few steps</p>
          </div>

          {roomDetails ? (
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="room-details-card">
                  <div className="room-image-section">
                    <img
                      src={roomDetails.image || "/images/cozyroom.png"}
                      alt={roomDetails.hotel_name}
                      className="room-detail-image"
                      onError={(e) => {
                        e.target.src = "/images/cozyroom.png";
                      }}
                    />
                    <div className="room-status-overlay">
                      <span
                        className={`status-badge ${
                          roomDetails.status === "Available"
                            ? "status-available"
                            : "status-unavailable"
                        }`}
                      >
                        {roomDetails.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="room-info-section">
                    <h2 className="hotel-name">{roomDetails.hotel_name}</h2>
                    <div className="room-details-grid">
                      <div className="detail-item">
                        <i className="bi bi-door-open"></i>
                        <span className="detail-label">Room Number</span>
                        <span className="detail-value">{roomDetails.room_number}</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-geo-alt"></i>
                        <span className="detail-label">Address</span>
                        <span className="detail-value">{roomDetails.address}</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-house"></i>
                        <span className="detail-label">Room Type</span>
                        <span className="detail-value">{roomDetails.room_type}</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-star"></i>
                        <span className="detail-label">Rating</span>
                        <span className="detail-value">
                          {roomDetails.Ratings ? `${roomDetails.Ratings}/5` : "Not Rated"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="booking-form-card">
                  <div className="price-section">
                    <div className="price-display">
                      <span className="currency">₹</span>
                      <span className="amount">{roomDetails.price}</span>
                      <span className="period">/ night</span>
                    </div>
                    <p className="price-note">Price per night</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="booking-form">
                    <div className="form-group">
                      <label htmlFor="check_in_date" className="form-label">
                        <i className="bi bi-calendar-check me-2"></i>Check-in Date
                      </label>
                      <input
                        type="date"
                        id="check_in_date"
                        className="form-control"
                        value={check_in_date}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="check_out_date" className="form-label">
                        <i className="bi bi-calendar-x me-2"></i>Check-out Date
                      </label>
                      <input
                        type="date"
                        id="check_out_date"
                        className="form-control"
                        value={check_out_date}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn-book-room">
                      <i className="bi bi-calendar-check me-2"></i>
                      Book Room Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading-section">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="loading-text">Loading room details...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RoomBooking;

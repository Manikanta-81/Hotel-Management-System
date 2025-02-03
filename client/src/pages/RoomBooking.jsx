import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

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
      <div className="container w-75">
        <h2 className="text-center">Room Booking</h2>
        {roomDetails ? (
          <div className="card my-4">
            <div className="card-body">
              <h3 className="card-title fw-light">{roomDetails.hotel_name}</h3>
              <p className="card-text">
                <strong>Room Number:</strong> {roomDetails.room_number}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {roomDetails.address}
              </p>
              <p className="card-text">
                <strong>Type:</strong> {roomDetails.room_type}
              </p>
              <p className="card-text">
                <strong>Price:</strong> ₹{roomDetails.price} / night
              </p>
              <p className="card-text">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    roomDetails.status === "Available"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {roomDetails.status}
                </span>
              </p>
              <p className="card-text">
                <strong>Ratings:</strong>{" "}
                {roomDetails.Ratings ? `${roomDetails.Ratings}/5` : "Not Rated"}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading room details...</p>
        )}

        {/* Room booking form */}
        <form onSubmit={handleFormSubmit} className="my-4">
          <div className="mb-3">
            <label htmlFor="check_in_date" className="form-label">
              Check-in Date
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

          <div className="mb-3">
            <label htmlFor="check_out_date" className="form-label">
              Check-out Date
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

          <button type="submit" className="btn btn-primary w-100">
            Book Room
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default RoomBooking;

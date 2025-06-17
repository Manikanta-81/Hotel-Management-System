import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axiosInstance";

function ConfirmBooking() {
  const { bookingId } = useParams(); // Get booking ID from the route params
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState(null);

  // Fetch booking details using the booking ID when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`/bookings/get-booking-by-id/${bookingId}`)
      .then((res) => {
        console.log(res.data);
        setBookingDetails(res.data.booking); // Store booking details
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        alert("Failed to fetch booking details. Please try again later.");
      });
  }, [bookingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    console.log(token);

    if (!token) {
      alert("Unauthorized access. Please login.");
      navigate("/login");
      return;
    }

    axiosInstance
      .put(
        `/bookings/confirm-booking/${bookingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      )
      .then((res) => {
        // Check for status codes and handle the response accordingly
        if (res.status === 404) {
          alert("Booking not found.");
        } else if (res.status === 400) {
          alert("Booking is already confirmed.");
        } else {
          console.log(res);
          console.log(res.data); // This will contain the success message and booking details
          alert("Booking confirmed successfully.");

          navigate(`/details/booking-confirmed/${bookingId}`);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          console.error("Error confirming the booking:", err.message || err);
          alert("An error occurred while confirming the booking.");
        }
      });
  };

  return (
    <Layout>
      <div className="container w-75">
        <h2 className="text-center mb-4">Booking Confirmation</h2>
        {bookingDetails ? (
          <div>
            {/* Booking ID Alert */}
            <div className="alert alert-primary" role="alert">
              <h5 className="mb-1">
                <strong>Booking ID:</strong>{" "}
                <span className="text-primary fw-light">{bookingId}</span>
              </h5>
              <p className="text-muted mb-0">
                Please review your booking details below before confirming.
              </p>
            </div>

            {/* Room and Customer Details Combined */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <h3 className="card-title fw-light text-primary mb-3 d-flex align-items-center">
                  <i className="bi bi-building me-2"></i> {/* Bootstrap Icon */}
                  {bookingDetails.room_id.hotel_name}
                </h3>

                {/* Room and Booking Info */}
                <div className="row">
                  {/* Room Number and Price */}
                  <div className="col-md-6">
                    <p className="card-text">
                      <strong>Room Number:</strong>{" "}
                      {bookingDetails.room_id.room_number}
                    </p>
                    <p className="card-text">
                      <strong>Room Price:</strong> ₹
                      {bookingDetails.room_id.price}
                    </p>
                  </div>

                  {/* Check-in and Check-out Dates */}
                  <div className="col-md-6">
                    <p className="card-text">
                      <strong>Check-in Date:</strong>{" "}
                      {new Date(
                        bookingDetails.check_in_date
                      ).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      <strong>Check-out Date:</strong>{" "}
                      {new Date(
                        bookingDetails.check_out_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <hr />

                {/* Price and Status */}
                <div className="row">
                  <div className="col-md-6">
                    <p className="card-text">
                      <strong>Total Price:</strong>{" "}
                      <span className="badge bg-primary fs-6  text-light">
                        ₹{bookingDetails.price}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Customer Details Section */}
                <div className="mt-4">
                  {" "}
                  {/* Adding a margin-top to create a gap */}
                  <h3 className="card-title fw-light text-primary mb-3">
                    Customer Details
                  </h3>
                  {/* Customer Information */}
                  <div className="row">
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Customer Name:</strong>{" "}
                        {bookingDetails.customer_id.user_id.name}
                      </p>
                      <p className="card-text">
                        <strong>Customer Email:</strong>{" "}
                        {bookingDetails.customer_id.user_id.email}
                      </p>
                      <p className="card-text">
                        <strong>Contact:</strong>{" "}
                        {bookingDetails.customer_id.contact}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Address:</strong>{" "}
                        {bookingDetails.customer_id.address}
                      </p>
                      <p className="card-text">
                        <strong>Gender:</strong>{" "}
                        {bookingDetails.customer_id.gender}
                      </p>
                      <p className="card-text">
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(
                          bookingDetails.customer_id.dob
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="mt-4">
                  <h3 className="card-title fw-light text-primary mb-3 fs-4">
                    Room & Booking Status
                  </h3>
                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <p className="card-text">
                        <strong>Room Status: </strong>
                        <span
                          className={`badge fs-6 ${
                            bookingDetails.room_id.status === "Available"
                              ? "bg-success"
                              : bookingDetails.room_id.status === "Reserved"
                              ? "bg-warning text-dark"
                              : bookingDetails.room_id.status === "Booked"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {bookingDetails.room_id.status}
                        </span>
                      </p>
                    </div>

                    <div className="col-md-6 mt-2">
                      <p className="card-text">
                        <strong> Booking Status:</strong>{" "}
                        <span
                          className={`badge fs-6 ${
                            bookingDetails.status === "confirmed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {bookingDetails.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Confirm Booking Button */}
              <div className="text-center mt-4 card-footer w-100 ">
                <button
                  className="btn btn-primary "
                  onClick={handleSubmit} // Handle the submit logic here
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading booking details...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ConfirmBooking;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axiosInstance";

function BookingDetails() {
  const { bookingId } = useParams(); // Get booking ID from the route params
  const [details, setDetails] = useState(null);

  // Fetch booking details using the booking ID when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`/bookings/get-booking-by-id/${bookingId}`)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data.booking); // Store booking details
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        alert("Failed to fetch booking details. Please try again later.");
      });
  }, [bookingId]);

  // Print function
  const handlePrint = () => {
    const printContent = document.getElementById("print-section"); // Get the layout section
    const printWindow = window.open("", "_blank"); // Open a new window

    printWindow.document.write("<html><head><title>Booking Details</title>");

    const styles = document.querySelectorAll("link[rel='stylesheet'], style"); // Get all linked and inline styles
    styles.forEach((style) => {
      printWindow.document.write(style.outerHTML); // Write each style to the print window
    });

    printWindow.document.write(
      `<style>
        body { font-family: Arial, sans-serif; }
        .container { width: 100%; }
        @media print {
          body * { visibility: hidden; }
          #print-section, #print-section * { visibility: visible; }
        }
      </style>`
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write("<div id='print-section'>");
    printWindow.document.write(printContent.innerHTML); // Write the content to the new window
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    // printWindow.print(); // Trigger the print dialog

    printWindow.onload = () => {
      printWindow.print(); // Trigger the print dialog after the content has loaded
    };
  };

  return (
    <Layout>
      <div
        className="container w-75"
        id="print-section"
        style={{ marginTop: "-1rem" }}
      >
        <h2 className="text-center mb-4">Your Booking is Confirmed!</h2>
        {details ? (
          <div>
            {/* Final Confirmation Message */}
            <div className="alert alert-success" role="alert">
              <h5 className="mb-1">
                Booking ID: <strong>{bookingId}</strong>
              </h5>
              <p className="mb-0" >
                Congratulations! Your booking has been successfully confirmed.
                Below are the final details of your reservation. Please verify
                and save them for future reference.
              </p>
            </div>

            {/* Details Card */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                {/* Hotel Details */}
                <h3 className="text-primary fw-light mb-4">
                  <i className="bi bi-info-circle me-2"></i> Hotel Details
                </h3>

                {/* Hotel Name */}
                <div className="row">
                  <div className="col-12">
                    <h3 className="card-title fw-bold text-success mb-3 d-flex align-items-center">
                      <i className="bi bi-building me-2"></i>{" "}
                      {details.room_id.hotel_name}
                    </h3>
                  </div>
                </div>

                {/* Address and Ratings */}
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Address:</strong> {details.room_id.address}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Ratings(out of 5):</strong>{" "}
                      <span className="text-warning">
                        {details.room_id.Ratings}{" "}
                        <i className="bi bi-star-fill"></i>
                      </span>
                    </p>
                  </div>
                </div>

                <hr />

                {/* Room Details */}
                <h3 className="card-title text-primary fw-light mb-3">
                  Room Details
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Room Number:</strong>{" "}
                      {details.room_id.room_number}
                    </p>
                    <p>
                      <strong>Room Type:</strong> {details.room_id.room_type}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Price per Night:</strong> ₹{details.room_id.price}
                    </p>
                    <p>
                      <strong>Room Status: </strong>
                      <span
                        className={`badge fs-6 px-3 py-2 ${
                          details.room_id.status === "Available"
                            ? "bg-success"
                            : details.room_id.status === "Reserved"
                            ? "bg-warning text-dark"
                            : details.room_id.status === "Booked"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {details.room_id.status}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />

                {/* Booking Details */}
                <h3 className="card-title text-primary fw-light mb-3">
                  Booking Information
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Check-in Date:</strong>{" "}
                      {new Date(details.check_in_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Check-out Date:</strong>{" "}
                      {new Date(details.check_out_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-md-6 ">
                    <p>
                      <strong>Booking Date :</strong>{" "}
                      {new Date(details.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Booking Time :</strong>{" "}
                      {new Date(details.createdAt).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* displaying the price and booking status seperately */}

                  <div className="col-md-6 mt-1">
                    <p>
                      <strong>Total Price: </strong>
                      <span className="badge bg-success fs-6 px-3 py-2">
                        ₹{details.price}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6 mt-1">
                    <p>
                      <strong> Booking Status:</strong>{" "}
                      <span
                        className={`badge fs-6 px-3 py-2 ${
                          details.status === "confirmed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {details.status}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />

                {/* Customer Details */}
                <h3 className="card-title text-primary fw-light mb-3">
                  Customer Details
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Name:</strong> {details.customer_id.user_id.name}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {details.customer_id.user_id.email}
                    </p>
                    <p>
                      <strong>Gender:</strong> {details.customer_id.gender}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Contact:</strong> {details.customer_id.contact}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(details.customer_id.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Address:</strong> {details.customer_id.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <div className="text-center mt-4 card-footer w-100 ">
                <button className="btn btn-primary " onClick={handlePrint} style={{fontFamily:"SF Pro Text"}}>
                  Print booking Details
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
      {/* Buttons for Feedback and Home */}

      <div className="d-flex justify-content-center mt-4">
        {/* Feedback Button inside Link */}
        <Link to={`/feedback/${bookingId}`} className="btn-link me-3">
          <button className="btn btn-success" style={{fontFamily:"Sogoe UI"}}>Leave Feedback</button>
        </Link>

        {/* Home Button inside Link */}
        <Link to="/" className="btn-link me-3">
          <button className="btn btn-secondary" style={{fontFamily:"Sogoe UI"}}>Go to Home</button>
        </Link>

        <Link to="/viewrooms" className="btn-link ">
          <button className="btn btn-primary"style={{fontFamily:"SF Pro Text"}}>Book Another Room</button>
        </Link>
      </div>
    </Layout>
  );
}

export default BookingDetails;

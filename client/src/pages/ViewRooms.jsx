import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import "../styles/ViewRooms.css";

function ViewRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [priceSort, setPriceSort] = useState(""); // For price sorting
  const [ratingsSort, setRatingsSort] = useState(""); // For ratings sorting

  useEffect(() => {
    axiosInstance
      .get("/rooms/get-all-rooms")

      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);
        alert(res.data.message);
        setRooms(res.data.rooms);
        setFilteredRooms(res.data.rooms); // Initialize filteredRooms with all rooms
      })
      .catch((err) => {
        toast.error("Failed to fetch rooms. Please try again.");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let updatedRooms = [...rooms]; // Copy the original rooms array

    // Apply Availability Filter
    if (availabilityFilter === "Available") {
      updatedRooms = updatedRooms.filter((room) => room.status === "Available");
    }
    if (availabilityFilter === "Booked") {
      updatedRooms = updatedRooms.filter((room) => room.status === "Booked");
    }

    if(availabilityFilter ==="Maintenance"){
      updatedRooms = updatedRooms.filter((room) => room.status === "Maintenance");
    }

    //  Apply Price Sorting
    if (priceSort === "low-to-high") {
      updatedRooms.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      updatedRooms.sort((a, b) => b.price - a.price);
    }

    if (ratingsSort !== "") {
      const minRating = parseInt(ratingsSort, 10); // Convert to number
      updatedRooms = updatedRooms.filter((room) => room.Ratings >= minRating);
    }

    //  Update filteredRooms state
    setFilteredRooms(updatedRooms);
  }, [availabilityFilter, priceSort, ratingsSort, rooms]);

  function handleRoomClick(room) {
    if (
      room.status === "Booked" ||
      room.status === "Maintenance" ||
      room.status === "Reserved"
    ) {
      // alert(`Room is under ${room.status}. Please select another room.`);
      toast.info(`Room is under ${room.status}. Please select another room.`, {
        theme: "dark",
      });
    } else {
      toast.success(`The selected room is avaliable  `, { theme: "dark" });
      // navigate(`/viewrooms/booking/${room._id}`);
      setTimeout(() => {
        navigate(`/viewrooms/booking/${room._id}`);
      }, 1500);
    }
  }

  function displayRooms() {
    return (
      <div className="container py-4">
        <div className="row g-4">
          {filteredRooms.map((room) => (
            <div key={room._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="room-card h-100">
                <div className="room-image-container">
                  <img
                    src={room.image || "/images/cozyroom.png"}
                    alt={room.hotel_name}
                    className="room-image"
                    onError={(e) => {
                      e.target.src = "/images/cozyroom.png";
                    }}
                  />
                  <div className="room-status-badge">
                    <span
                      className={`badge ${
                        room.status === "Available" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </div>
                <div className="room-content">
                  <h3 className="room-title">{room.hotel_name}</h3>
                  <div className="room-details">
                    <p className="room-address">
                      <i className="bi bi-geo-alt me-2"></i>
                      {room.address}
                    </p>
                    <p className="room-info">
                      <i className="bi bi-door-open me-2"></i>
                      Room {room.room_number} • {room.room_type}
                    </p>
                    <div className="room-price-rating">
                      <div className="price">
                        <strong>₹{room.price}</strong>
                        <span className="price-unit">/ night</span>
                      </div>
                      <div className="rating">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{room.Ratings || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="room-actions">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleRoomClick(room)}
                    >
                      <i className="bi bi-calendar-check me-2"></i>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <div className="page-header">
          <h1 className="page-title">Available Rooms</h1>
          <p className="page-subtitle">Book your perfect stay with us</p>
        </div>

        <div className="container py-4">
          <div className="filters-section">
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-md-4">
                <label className="filter-label">
                  <i className="bi bi-funnel me-2"></i>Availability
                </label>
                <select
                  className="form-select filter-select"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="All">All Rooms</option>
                  <option value="Available">Available Rooms</option>
                  <option value="Booked">Booked Rooms</option>
                  <option value="Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="col-12 col-sm-6 col-md-4">
                <label className="filter-label">
                  <i className="bi bi-currency-rupee me-2"></i>Price
                </label>
                <select
                  className="form-select filter-select"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="">No Sorting</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>

              <div className="col-12 col-sm-6 col-md-4">
                <label className="filter-label">
                  <i className="bi bi-star me-2"></i>Ratings
                </label>
                <select
                  className="form-select filter-select"
                  value={ratingsSort}
                  onChange={(e) => setRatingsSort(e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Display rooms */}
        {displayRooms()}
      </Layout>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default ViewRooms;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

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
            <div key={room._id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title  fw-light">{room.hotel_name}</h2>
                  <p className="card-text">
                    <strong>Address:</strong> {room.address}
                  </p>
                  <p className="card-text">
                    <strong>Room Number:</strong> {room.room_number}
                  </p>
                  <p className="card-text">
                    <strong>Type:</strong> {room.room_type}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{room.price} / night
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        room.status === "Available" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {room.status}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Ratings:</strong>{" "}
                    {room.Ratings ? `${room.Ratings}/5` : "Not Rated"}
                  </p>
                </div>
                <div className="card-footer text-center">
                  {/* <Link to={`/viewrooms/booking/${room._id}`}> */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRoomClick(room)}
                    // disabled={room.status !== "Available"} // Disable if not available
                  >
                    Book Now
                  </button>
                  {/* </Link> */}
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
        {/* <h1>Home page </h1> */}
        <h3 className="fw-semibold text-center text-success p-2 fw-light">
          {" "}
          Book your room in the Available hotels.
        </h3>

        <div className="container py-4">
          <div className="row g-4 ">
            <div className="col-12 col-sm-6 col-md-4">
              <label className="fw-semibold mb-1">Sort by Availability:</label>
              <select
                className="form-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="All">All Rooms</option>
                <option value="Available">Available Rooms</option>
                <option value="Booked">Booked Rooms</option>
                <option value="Maintenance">Rooms under Maintenance</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 ">
              <label className="fw-semibold mb-1">Sort by Price:</label>
              <select
                className="form-select"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
              >
                <option value="">None</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 ">
              <label className="fw-semibold mb-1">Sort by Ratings:</label>
              <select
                className="form-select"
                value={ratingsSort}
                onChange={(e) => setRatingsSort(e.target.value)}
              >
                <option value="">All</option>
                <option value="3">3 & above</option>
                <option value="4">4 & above</option>
                <option value="5">5 stars only</option>
              </select>
            </div>
          </div>
        </div>

        {/* fetch the data from the data into diplay/view rooms page  */}
        <div className="d-flex m-2">{displayRooms()}</div>
      </Layout>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default ViewRooms;

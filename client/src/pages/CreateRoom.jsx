import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function CreateRoom() {
  const [hotel_name, setHotel_name] = useState("");
  const [address, setAddress] = useState("");
  const [room_number, setRoom_number] = useState("");
  const [room_type, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [Ratings, setRatings] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formObj = {
      hotel_name,
      address,
      room_number,
      room_type,
      price,
      status,
      image,
      Ratings,
    };
    console.log(formObj);

    axiosInstance
      .post("/rooms/create-room", formObj)
      .then((res) => {
        console.log(res);
        alert("Room Added successfully");
        setSuccess(true);
        // alert("Redirecting to the Home page, kindly log out");
        // setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div>
      <Layout>
        <div
          className=" card shadow-lg w-50 container  rounded-4 "
          style={{ border: "5px solid lightslategray" }}
        >
          <h1 className="text-center mb-3">Create Room</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group p-1">
              {/* Hotel name  */}

              <label htmlFor="hotel_name">Hotel Name:</label>
              <input
                type="text"
                name="hotel_name"
                id="hotel_name"
                className="form-control"
                placeholder="Enter the Hotel Name"
                required
                value={hotel_name}
                onChange={(event) => setHotel_name(event.target.value)}
              />
            </div>

            {/* address  */}
            <div className="form-group p-1">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control"
                placeholder="Enter the Hotel Name"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            {/* Room number  */}

            <div className="form-group p-1">
              <label htmlFor="room_number">Room No:</label>
              <input
                type="text"
                name="room_number"
                id="room_number"
                className="form-control"
                placeholder="Enter the Room number of the hotel"
                value={room_number}
                onChange={(event) => {
                  setRoom_number(event.target.value);
                }}
                required
              />
            </div>

            {/* Room type */}

            <div className="form-group p-1">
              <label htmlFor="room_type">Room Type:</label>
              <select
                name="room_type"
                id="room_type"
                className="form-control"
                value={room_type}
                onChange={(event) => {
                  setRoomType(event.target.value);
                }}
              >
                <option value="" disabled>
                  Select the room type
                </option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Villa">Villa</option>
                <option value="Bungalow">Bungalo</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            {/* Price  */}

            <div className="form-group p-1">
              <label htmlFor="price">Price of the room (Per Day/Night):</label>
              <input
                type="Number"
                name="price"
                id="price"
                className="form-control"
                placeholder="Enter the Room Price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                required
              />
            </div>

            {/* Room status  */}

            <label htmlFor="status">Room Status:</label>
            <select
              name="status"
              id="status"
              className="form-control"
              value={status} // Bind the selected value to the 'status' state
              onChange={(event) => setStatus(event.target.value)} // Update the state when an option is selected
            >
              <option value="">Select the room status</option>
              <option value="Available">Available</option>
              {/* <option value="Reserved">Reserved</option> */}
              {/* <option value="Booked">Booked</option> */}
              <option value="Maintenance">Maintenance</option>
            </select>

            {/* Ratings  */}

            <div className="form-group p-1">
              <label htmlFor="Ratings">Ratings: (out of 5)</label>
              <input
                type="Number"
                name="Ratings"
                id="Ratings"
                className="form-control"
                placeholder="Select the Ratings of the Room"
                required
                value={Ratings}
                onChange={(event) => {
                  setRatings(event.target.value);
                }}
              />
            </div>

            <div className="form-group  p-1">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/**"
                name="image"
                id="placeimage"
                className="form-control"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </div>

            <div className="form-group d-flex justify-content-center ">
              <input
                type="submit"
                className="btn btn-primary p-3 m-3  rounded-4 "
              />
            </div>

            {success && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-success m-2"
                  onClick={() => {
                    setHotel_name("");
                    setAddress("");
                    setRoom_number("");
                    setRoomType("");
                    setPrice("");
                    setStatus("");
                    setImage("");
                    setRatings("");
                    setSuccess(false);
                  }}
                >
                  Add Another Room
                </button>
                <button
                  className="btn btn-secondary m-2"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Go to Home
                </button>
              </div>
            )}
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default CreateRoom;

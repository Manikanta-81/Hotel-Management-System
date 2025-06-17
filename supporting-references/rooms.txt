import React from "react";
import Layout from "../components/Layout";

function Rooms() {
  // Static data for rooms
  const rooms = [
    {
      room_number: 101,
      type: "Single",
      price: 3500,
      status: "Available",
      amenities: ["Wi-Fi", "AC", "TV", "Mini Bar"],
      description: "A cozy single room with all modern amenities."
    },
    {
      room_number: 102,
      type: "Double",
      price: 5000,
      status: "Booked",
      amenities: ["Wi-Fi", "AC", "TV", "Refrigerator"],
      description: "Perfect for couples, featuring a comfortable bed and great amenities."
    },
    {
      room_number: 103,
      type: "Suite",
      price: 12000,
      status: "Available",
      amenities: ["Wi-Fi", "AC", "TV", "Jacuzzi", "Mini Bar"],
      description: "A luxurious suite with a Jacuzzi, perfect for a relaxing stay."
    },
    {
      room_number: 104,
      type: "Single",
      price: 3500,
      status: "Available",
      amenities: ["Wi-Fi", "AC", "TV"],
      description: "A basic room with all essential amenities for a comfortable stay."
    },
    {
      room_number: 105,
      type: "Double",
      price: 5500,
      status: "Maintenance",
      amenities: ["Wi-Fi", "AC", "TV", "Refrigerator", "Balcony"],
      description: "A spacious double room with a beautiful view from the balcony."
    },
    {
      room_number: 106,
      type: "Suite",
      price: 15000,
      status: "Available",
      amenities: ["Wi-Fi", "AC", "TV", "Jacuzzi", "Living Room"],
      description: "A premium suite with a living room and jacuzzi for ultimate relaxation."
    }
  ];

  return (
    <div>
      <Layout>
        <div className="container ">
          <h1>Rooms Available</h1>
          <p>Here are some of the rooms available at StayHub for booking:</p>

          <div className="row">
            {rooms.map((room) => (
              <div className="col-md-4 mb-4" key={room.room_number}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Room {room.room_number}</h5>
                    <p className="card-text">
                      <strong>Type:</strong> {room.type} <br />
                      <strong>Price:</strong> ₹{room.price} <br />
                      <strong>Status:</strong> {room.status} <br />
                      <strong>Amenities:</strong> {room.amenities.join(", ")} <br />
                      <strong>Description:</strong> {room.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Rooms;

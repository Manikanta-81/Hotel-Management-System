import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Customer from "../pages/Customer";
import ViewRooms from "../pages/ViewRooms";
import CreateRoom from "../pages/CreateRoom";
import RoomBooking from "../pages/RoomBooking";
import Feedback from "../pages/Feedback";
import ConfirmBooking from "../pages/ConfirmBooking";
import BookingDetails from "../pages/BookingDetails";
function NavRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/viewrooms" element={<ViewRooms />} />
          <Route path="/viewrooms/booking/:roomId" element={<RoomBooking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback/:bookingId" element={<Feedback/>} / >
          <Route path="/viewrooms/:roomId/booking-confirm/:bookingId" element={<ConfirmBooking />} />
          <Route path="/details/booking-confirmed/:bookingId" element={<BookingDetails />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NavRoutes;

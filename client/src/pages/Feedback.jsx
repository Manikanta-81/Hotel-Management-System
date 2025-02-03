import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Importing a star icon from react-icons
import axiosInstance from "../utils/axiosInstance";

function Feedback() {
  const { bookingId } = useParams();
  const [comments, setComments] = useState("");
  const [room_rating, setRoomRating] = useState(0); // Default is 0 (no stars selected)
  const [service_rating, setServiceRating] = useState(0);
  const [cleanliness_rating, setCleanlinessRating] = useState(0);
  const [would_recommend, setWouldRecommend] = useState(true);
  const [stay_purpose, setStayPurpose] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const navigate = useNavigate();

  // Handle star rating selection
  const handleRatingClick = (ratingType, rating) => {
    if (ratingType === "room") setRoomRating(rating);
    else if (ratingType === "service") setServiceRating(rating);
    else if (ratingType === "cleanliness") setCleanlinessRating(rating);
  };

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Validate that necessary fields are filled
    if (!comments || !stay_purpose) {
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const formObj = {
      booking_id: bookingId,
      comments,
      room_rating,
      service_rating,
      cleanliness_rating,
      would_recommend,
      stay_purpose,
    };
    console.log(formObj);

    // Send data to the backend
    axiosInstance
      .post("/feedback/add-feedback", formObj)
      .then((res) => {
        console.log(res);
        alert("Feedback submitted successfully");
        navigate("/");
        setErrorMessage(""); // Clear any previous error message
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.message || "Error submitting feedback."
          );
        } else {
          setErrorMessage("Error submitting feedback. Please try again later.");
        }
      });
  }

  return (
    <div>
      <Layout>
        <div
          className="card shadow-lg w-50 container rounded-4"
          style={{ border: "5px solid lightslategray" }}
        >
          <h1 className="text-center mb-3">Submit Feedback</h1>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger">
                <strong>Error:</strong> {errorMessage}
              </div>
            )}

            {/* Room Rating */}
            <div className="form-group p-1">
              <label htmlFor="room_rating">Room Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FaStar
                    key={rating}
                    onClick={() => handleRatingClick("room", rating)}
                    size={30}
                    color={rating <= room_rating ? "#ffc107" : "#e4e5e9"} // Gold for selected, gray for unselected
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                ))}
              </div>
            </div>

            {/* Service Rating */}
            <div className="form-group p-1">
              <label htmlFor="service_rating">Service Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FaStar
                    key={rating}
                    onClick={() => handleRatingClick("service", rating)}
                    size={30}
                    color={rating <= service_rating ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                ))}
              </div>
            </div>

            {/* Cleanliness Rating */}
            <div className="form-group p-1">
              <label htmlFor="cleanliness_rating">Cleanliness Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FaStar
                    key={rating}
                    onClick={() => handleRatingClick("cleanliness", rating)}
                    size={30}
                    color={rating <= cleanliness_rating ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                ))}
              </div>
            </div>

            {/* Would Recommend */}
            <div className="form-group p-1">
              <label htmlFor="would_recommend">
                Would you recommend this hotel?
              </label>
              <div>
                <button
                  type="button"
                  className={`btn ${
                    would_recommend ? "btn-primary" : "btn-light"
                  } m-1`}
                  onClick={() => setWouldRecommend(true)}
                  style={{
                    minWidth: "80px",
                    fontSize: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`btn ${
                    !would_recommend ? "btn-primary" : "btn-light"
                  } m-1`}
                  onClick={() => setWouldRecommend(false)}
                  style={{
                    minWidth: "80px",
                    fontSize: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  No
                </button>
              </div>
            </div>

            {/* Stay Purpose */}
            <div className="form-group p-1">
              <label htmlFor="stay_purpose">Purpose of Stay:</label>
              <select
                name="stay_purpose"
                id="stay_purpose"
                className="form-control"
                value={stay_purpose}
                onChange={(event) => setStayPurpose(event.target.value)}
              >
                <option value="" disabled>
                  Select your stay purpose
                </option>
                <option value="Business">Business</option>
                <option value="Leisure">Leisure</option>
                <option value="Vacation">Vacation</option>
                <option value="Conference">Conference</option>
                <option value="Exploring">Exploring</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Comments */}
            <div className="form-group p-1">
              <label htmlFor="comments">Comments:</label>
              <textarea
                name="comments"
                id="comments"
                className="form-control"
                placeholder="Enter your comments"
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-group d-flex justify-content-center">
              <input
                type="submit"
                className="btn btn-primary p-3 m-3 rounded-4"
                value="Submit Feedback"
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Feedback;

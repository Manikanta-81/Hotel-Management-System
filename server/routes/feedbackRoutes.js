const express= require("express");
const router= express.Router();

const {addFeedback, getAllFeedback, getFeedbackByBookingId}= require("../controllers/feedbackControllers");


router.post("/add-feedback", addFeedback);

router.get("/get-all-feedback", getAllFeedback);

router.get("/getfeedback/:bookingId",getFeedbackByBookingId);


module.exports=router;
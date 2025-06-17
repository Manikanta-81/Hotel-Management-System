const express = require("express");
const router = express.Router();

const { saveContactMessage } = require("../controllers/contactControllers");

router.post("/savecontact", saveContactMessage);

module.exports = router;

const Contact = require("../models/contactSchema");

// Controller to handle form submission

const saveContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create a new contact message
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    console.log(contact);

    // Save the contact message to the database
    await contact.save();

    res.status(201).json({
      message: "Message sent successfully!",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

module.exports = { saveContactMessage };
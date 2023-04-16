const express = require("express");
const router = express.Router();

const sql = require('../db');

// Send message to db

router.post('/', async (req, res) => {
  const { sender_name, email_address, message } = req.body;

  try {
    const result = await sql`INSERT INTO messages(sender_name, email_address, message) VALUES(${sender_name}, ${email_address}, ${message})`;
    res.send({status: 'success', message: 'Message successfully sent'})
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: 'Internal server error'});
  }
})

module.exports = router;
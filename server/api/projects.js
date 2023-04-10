const express = require("express");
const router = express.Router();

const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM projects`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
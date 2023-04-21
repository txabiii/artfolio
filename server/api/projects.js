const express = require("express");
const router = express.Router();

const sql = require('../db');

// Select all projects

router.get('/', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM projects`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select project by project_id

router.get('/:id', async (req, res) => {
  try {
    const query = sql`SELECT * FROM projects WHERE project_id = ${req.params.id}`;
    console.log(query)
    const result = await query
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
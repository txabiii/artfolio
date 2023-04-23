const express = require("express");
const router = express.Router();

const sql = require('../db');

// Select image by image_id

router.get('/image/:id', async (req, res) => {
  try {
    const result = await sql`
      SELECT i.*, COUNT(p.product_id) > 0 AS has_product 
      FROM images i
      LEFT JOIN products p ON i.image_id = p.image_id
      WHERE i.image_id = ${req.params.id}
      GROUP BY i.image_id`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select images by project_id

router.get('/:id/:max?', async (req, res) => {
  try {
    const limit = req.params.max || 10000;
    const result = await sql`
      SELECT i.*, COUNT(p.product_id) > 0 AS has_product 
      FROM images i
      LEFT JOIN products p ON i.image_id = p.image_id
      WHERE project_id = ${req.params.id} 
      GROUP BY i.image_id
      LIMIT ${limit}`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
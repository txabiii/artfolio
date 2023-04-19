const express = require("express");
const router = express.Router();

const sql = require('../db');

// Select all products

router.get('/', async (req, res) => {
  try {
    const result = await sql`select p.*, sale_percent from products p left join product_sale ps ON p.product_id = ps.product_id order by p.product_id asc`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select all products on sale

router.get('/sale', async (req, res) => {
  try {
    const result = await sql`select p.*, sale_percent from products p inner join product_sale ps ON p.product_id = ps.product_id ORDER BY sale_percent ASC limit 4`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select all top picks products

router.get('/top', async (req, res) => {
  try {
    const result = await sql`select p.*, sale_percent from top_picks tp inner join products p on tp.product_id = p.product_id left join product_sale ps on ps.product_id = p.product_id  limit 4`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select all new products

router.get('/new', async (req, res) => {
  try {
    const result = await sql`select p.*, sale_percent from products p left join product_sale ps ON p.product_id = ps.product_id order by p.product_id desc limit 4`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
const express = require("express");
const router = express.Router();

const sql = require('../db');

// Select products with optional filters

router.get('/', async (req, res) => {
  try {    
    let query = sql`
    select p.*, sale_percent, pc.category_id
      from products p 
      left join product_sale ps ON p.product_id = ps.product_id
      left join product_category pc ON p.product_id = pc.product_id`;

    if (req.query.category_id) {
      const categoryIds = req.query.category_id.split(',').map(Number);
      query = sql`${query} WHERE pc.category_id = ANY(${categoryIds})`;
    }

    if(req.query.search) {
      const search = req.query.search;
      if(req.query.category_id) {
        query = sql`${query} AND (p.product_name ilike '%' || ${search} || '%' or p.product_description ilike '%' || ${search} || '%')`
      } else {
        query = sql`${query} WHERE (p.product_name ilike '%' || ${search} || '%' or p.product_description ilike '%' || ${search} || '%')`
      }
    }

    if(req.query.min_price && req.query.max_price) {
      const min = req.query.min_price;
      const max = req.query.max_price;
      if(req.query.category_id || req.query.search) {
        query = sql`${query} AND (p.price >= ${min} and p.price <= ${max})`
      } else {
        query = sql`${query} WHERE (p.price >= ${min} and p.price <= ${max})`
      }
    }

    if(req.query.image_id) {
      const imageId = req.query.image_id;
      if(req.query.category_id || req.query.search || (req.query.min_price && req.query.max_price)) {
        query = sql`${query} AND p.image_id = ${imageId}`
      } else {
        query = sql`${query} WHERE p.image_id = ${imageId}`
      }
    }

    query = sql`${query} order by p.product_id asc`;

    const result = await query;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select a product and its features

router.get('/product/:id', async (req, res) => {
  try {
    const result = await sql`
      select p.*, f.feature_description, pc.category_id
      from products p
      inner join product_category pc on pc.product_id = p.product_id 
      left join category_feature cf on cf.category_id = pc.category_id
      left join features f on f.feature_id = cf.feature_id
      where p.product_id = ${req.params.id}`
    res.send(result);
  } catch(error) {
    console.error(error);
    res.status(500).send('Internal server error')
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

// Select all product categories

router.get('/categories', async (req, res) => {
  try {
    const result = await sql`select * from categories`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Select related products

router.get('/related', async (req, res) => {
  try {
    const productId = req.query.product_id;
    const categoryId = req.query.category_id;

    const result = await sql`
    SELECT *
    FROM products p
    LEFT JOIN product_category pc ON pc.product_id = p.product_id
    WHERE p.product_id != ${productId}
    ORDER BY CASE WHEN pc.category_id = ${categoryId} THEN 0 ELSE 1 END, RANDOM()
    LIMIT 4;
    `;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

module.exports = router;
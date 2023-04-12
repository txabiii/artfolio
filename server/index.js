'use strict'

const express = require('express')
const cors = require('cors');

const app = express()
app.use(express.json());

const allowedOrigins = ['localhost:3000']
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

/** Simple greeting */

app.get('/', (req, res) => res.send('This is an Express.js server'))

/** Routes */

const projects = require('./api/projects');
app.use('/projects', projects)

const images = require('./api/images');
app.use('/images', images)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is listening on port ${port}.`))
'use strict'

const express = require('express')
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://localhost:3000','https://artfolio-wiky.vercel.app','https://artfolio-git-deployment-txabiii.vercel.app']
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());

/** Simple greeting */

app.get('/', (req, res) => res.send('This is an Express.js server'))

/** Routes */

const projects = require('./api/projects');
app.use('/projects', projects)

const images = require('./api/images');
app.use('/images', images)

const messages = require('./api/messages');
app.use('/messages', messages)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is listening on port ${port}.`))
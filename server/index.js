'use strict'

const express = require('express')
const projects = require('./api/projects')

const app = express()

/** Simple greeting */

app.get('/', (req, res) => res.send('This is an Express.js server'))

app.use('/projects', projects)

const port = process.env.PORT || 5000
app.listen(port, () =>   console.log(`Server is listening on port ${port}.`))
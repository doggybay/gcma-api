const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000;
const cors = require('cors')
const logger = require('morgan')
const { Model } = require('objection')
const knexInstance = require('./db/knex')

const customers = require('./routes/customers')
const teeTimes = require('./routes/tee_times')

Model.knex(knexInstance)

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//app.use('/', index);
app.use('/api', customers)
app.use('/api', teeTimes)

module.exports = { app }

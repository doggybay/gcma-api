const Tee_Time = require('../models/Tee_Time')
const knex = require("../db/knex");

exports.getAllTeeTimes = (req, res) => {
  Tee_Time.query().eager('customers').then(teeTimes => res.json(teeTimes))
}

exports.getOneTeeTime = (req, res) => {
  Tee_Time.query().findById(req.params.id).eager('customers').then(teeTime => res.json(teeTime))
}

exports.updateOneTeeTime = (req, res) => {
  Tee_Time.query().findById(req.params.id).patch(req.body).returning('*').then(updatedTeeTime => res.json(updatedTeeTime))
}

exports.addOneTeeTime = (req, res) => {

  let newTeeTime = {
    "time": req.body.time
  }

  Tee_Time.query().insert(newTeeTime).then(newTeeTime => {
    knex('customers_tee_times').insert(
      {
      "customer_id": req.body.customer_id,
      "tee_time_id": newTeeTime.id
      }
    ).then(result => result)
    res.json(newTeeTime)
  })
}

exports.deleteOneTeeTime = (req, res) => {
  Tee_Time.query().deleteById(req.params.id).returning('*').then(deletedTeeTime => res.json(deletedTeeTime))
}
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
  let requestedTeeTime = {
    time: req.body.time
  }

  Tee_Time.query().then(teeTimes => {
    let filteredTeeTime = teeTimes.filter(teeTime => teeTime.time === requestedTeeTime.time)[0]
    
    if (!filteredTeeTime) {
      Tee_Time.query().insert(requestedTeeTime).then(newTeeTime => {
        knex('customers_tee_times').insert(
          {
          "customer_id": req.body.customer_id,
          "tee_time_id": newTeeTime.id
          }
        ).returning('*').then(result => console.log(result))
        res.json(newTeeTime)
      })
    } else {
      knex('customers_tee_times').insert({
        "customer_id": req.body.customer_id,
        "tee_time_id": filteredTeeTime.id
      }).returning('*').then(result => res.json(result))
    }
    
  })

}

exports.deleteOneTeeTime = (req, res) => {
  Tee_Time.query().deleteById(req.params.id).returning('*').then(deletedTeeTime => res.json(deletedTeeTime))
}
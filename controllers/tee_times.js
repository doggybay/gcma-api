const Tee_Time = require('../models/Tee_Time')

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
  Tee_Time.query().insert(req.body).then(newTeeTime => res.json(newTeeTime))
}

exports.deleteOneTeeTime = (req, res) => {
  Tee_Time.query().deleteById(req.params.id).returning('*').then(deletedTeeTime => res.json(deletedTeeTime))
}
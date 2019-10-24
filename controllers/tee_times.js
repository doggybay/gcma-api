const Tee_Time = require('../models/Tee_Time')

exports.getAllTeeTimes = (req, res) => {
  Tee_Time.query().eager('customers').then(teeTimes => res.json(teeTimes))
}

exports.getOneTeeTime = (req, res) => {
  Tee_Time.query().findById(req.params.id).eager('customers').then(teeTime => res.json(teeTime))
}


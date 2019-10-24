const Customer = require('../models/Customer')

exports.getAllCustomers = (req, res) => {
  Customer.query().eager('tee_times').then(customers => res.json(customers))
}

exports.getOneCustomer = (req, res) => {
  Customer.query().findById(req.params.id).eager('tee_times').then(customer => res.json(customer))
}

exports.updateOneCustomer = (req, res) => {
  Customer.query().findById(req.params.id).patch(req.body).returning('*').then(updatedCustomer => res.json(updatedCustomer))
}

exports.deleteOneCustomer = (req, res) => {
  Customer.query().deleteById(req.params.id).returning('*').then(deletedCustomer => res.json(deletedCustomer))
}

exports.addOneCustomer = (req, res) => {
  Customer.query().insert(req.body).then(newCustomer => res.json(newCustomer))
}
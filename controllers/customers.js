const Customer = require('../models/Customer')

exports.getAllCustomers = (req, res) => {
  Customer.query().eager('tee_times').then(customers => res.json(customers))
}
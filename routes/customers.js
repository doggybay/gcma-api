const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers')

/* GET home page. */
router.get('/customers', customersController.getAllCustomers);

module.exports = router;

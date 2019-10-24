const express = require("express")
const router = express.Router()
const teeTimesController = require('../controllers/tee_times')

router.get('/tee-times', teeTimesController.getAllTeeTimes)



module.exports = router
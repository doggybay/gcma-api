const express = require("express")
const router = express.Router()
const teeTimesController = require('../controllers/tee_times')

router.get('/tee-times', teeTimesController.getAllTeeTimes)
router.get('/tee-times/:id', teeTimesController.getOneTeeTime)
router.post('/tee-times', teeTimesController.addOneTeeTime)
router.patch('/tee-times/:id', teeTimesController.updateOneTeeTime)
router.delete('/tee-times/:id', teeTimesController.deleteOneTeeTime)


module.exports = router
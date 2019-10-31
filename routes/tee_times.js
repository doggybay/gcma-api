const express = require("express")
const router = express.Router()
const teeTimesController = require('../controllers/tee_times')

router.get('/teetimes', teeTimesController.getAllTeeTimes)
router.get('/teetimes/:id', teeTimesController.getOneTeeTime)
router.post('/teetimes', teeTimesController.addOneTeeTime)
router.patch('/teetimes/:id', teeTimesController.updateOneTeeTime)
router.delete('/teetimes/:id', teeTimesController.deleteOneTeeTime)


module.exports = router
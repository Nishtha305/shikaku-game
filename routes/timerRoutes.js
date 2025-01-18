const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

router.post('/start', timerController.startTimer);
router.get('/track', timerController.trackTime);
router.post('/end', timerController.endTimer);

module.exports = router;

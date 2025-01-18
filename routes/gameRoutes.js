const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/initialize', gameController.initializeGame);
router.post('/generate-rectangles', gameController.generateRectangles);
router.get('/check-win', gameController.checkWin);

module.exports = router;
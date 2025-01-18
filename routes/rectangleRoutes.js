const express = require('express');
const router = express.Router();
const rectangleController = require('../controllers/rectangleController');

router.post('/select', rectangleController.selectRectangle);
router.post('/snap', rectangleController.snapRectangle);

module.exports = router;

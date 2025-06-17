const express = require('express');

const aicontroller = require('../controller/ai.controller')

const router = express.Router();

// route
router.post('/get-review', aicontroller.getReview);


module.exports = router;
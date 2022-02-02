const express = require('express');
const controller = require('./controller.js');
const router = express.Router();


//router for querying API
router.post('/search', controller.getResults, (req, res) => {
  res.status(200).json(res.locals);
});


//router for adding accommodations
router.post('/add', (req, res) => {
  res.status(200).json();
})

module.exports = router;
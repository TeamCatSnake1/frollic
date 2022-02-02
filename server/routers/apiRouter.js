const express = require('express');
const apiController = require('../controllers/apiController.js');
const router = express.Router();


//code here  
router.post('/search', apiController.getResults, (req, res) => {
  console.log('in the router');
  res.status(200).json(res.locals);
});

module.exports = router;
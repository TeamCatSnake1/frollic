const express = require('express');
const apiController = require('../controllers/apiController.js');
const apiRouter = express.Router();


//code here  
apiRouter.post('/search', apiController.getResults, apiController.getAccommodationsForVenues, (req, res) => {
  console.log('responding')
  res.status(200).json(res.locals.matches.perfectMatches);
});

apiRouter.post('/add', apiController.addAccommodationToVenue, (req, res) => {
  console.log('in the accommodation router')
  // sends back object { value: true }
  res.status(200).json(res.locals);

})

apiRouter.post('/acc', apiController.addNewAccommodation, (req, res) => {
  console.log('in add new accomodation router');
  // sends back object { value: true }
  res.status(200).json(res.locals);
})


module.exports = apiRouter;
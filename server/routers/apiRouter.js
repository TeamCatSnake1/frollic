const express = require('express');
const apiController = require('../controllers/apiController.js');
const apiRouter = express.Router();


//code here  
apiRouter.post('/search', apiController.getResults, apiController.getAccommodationsForVenues, apiController.accommodationSearch, (req, res) => {
  res.status(200).json(res.locals.finalized);
});

apiRouter.post('/add', apiController.addAccommodationToVenue, (req, res) => {
  res.status(200).json(res.locals);

})

apiRouter.post('/acc', apiController.addNewAccommodation, (req, res) => {
  res.status(200).json(res.locals);
})



module.exports = apiRouter;
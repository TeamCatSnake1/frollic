const express = require('express');
//const controller = require('../controllers/authController.js');
const authRouter = express.Router();


//router for login
authRouter.get('/', (req, res) => {
  res.status(200).json(res.locals);
});


//router for signup
authRouter.post('/', (req, res) => {
  res.status(200).json();
})

module.exports = authRouter;
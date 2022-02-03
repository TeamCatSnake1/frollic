const express = require('express');
const authController = require('../controllers/authController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
//const controller = require('../controllers/authController.js');
const authRouter = express.Router();


//router for login

authRouter.post('/login', sessionController.verifySession, authController.verifyUser, cookieController.setSSIDCookie, sessionController.addSession, (req, res) => {
  if (res.locals.valid){
    res.status(200).json(res.locals);
  } else {
    res.status(403).json("Invalid username or password.")
  }
});


//router for signup
authRouter.post('/signup', authController.addUser, cookieController.setSSIDCookie, sessionController.addSession, (req, res) => {
  res.status(200).json(res.locals);
})

authRouter.post('/logout', authController.logOut, (req, res) => {
  if (res.locals.valid){
    res.status(200).json(res.locals);
  } else {
    res.status(403).json("Log out unsuccessful")
  }
})

module.exports = authRouter;
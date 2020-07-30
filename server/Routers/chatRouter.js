const express = require('express');
const chatController {getChats, queryUser, addUser}= require('../Controllers/chatController.js');
const router = express.Router();

// get router for explore page
router.post('/', getChats, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  console.log("made it here, " , res.locals.messages)
  res.status(200).json(res.locals.messages);
});

router.post('/queryUser', queryUser, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  console.log("queryUser result: " , res.locals.addUser)
  res.status(200).json(res.locals.addUser);
});

router.post('/addUser', addUser, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  console.log("addUser made it back")
  res.status(200);
});

module.exports = router;

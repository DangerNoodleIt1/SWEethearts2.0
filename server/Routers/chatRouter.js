const express = require('express');
const chatController = require('../Controllers/chatController.js');
const router = express.Router();

// get router for explore page
router.post('/', chatController.getChats, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  console.log("made it here, " , res.locals.messages)
  res.status(200).json(res.locals.messages);
});

module.exports = router;

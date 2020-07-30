const model = require('../Models/model.js');

const chatController = {};

chatController.getChats = (req, res, next) => {
  console.log('BODY', req.body);
  const room = req.body.room;
  const queryText = `SELECT messages FROM chat_messages WHERE room_id = ${room}`;

  console.log(queryText);

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getTechs middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
    console.log('RESULTS', results.rows);
    res.locals.messages = results.rows;
    return next();
  });
};

module.exports = chatController;

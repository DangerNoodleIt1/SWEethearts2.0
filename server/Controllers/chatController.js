const model = require('../Models/model.js');

const chatController = {};

chatController.getChats = (req, res, next) => {
  console.log('BODY', req.body);
  const room = req.body.room;
  const queryText = `SELECT date, username, messages FROM chat_id_assn  INNER JOIN message_log  ON chat_id_assn.chat_id = message_log.chat_id WHERE idea_id = ${room}`
  console.log(queryText);

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getChats middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
    console.log('RESULTS', results.rows);
    res.locals.messages = results.rows;
    return next();
  });
};

chatController.queryUser = (req, res, next) => {
  console.log('queryUser BODY', req.body);
  const { user, chat } = req.body;
  const queryText = `SELECT list_id, chat_id, username FROM chat_user_assn WHERE chat_id = ${chat} AND username = ${user}`
  console.log(queryText);

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at queryUser middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
    console.log('queryUser results: ', results.rows);
    if (results.rows[0]) res.locals.addUser = false
    else res.locals.addUser = true;
    return next();
  });
};

chatController.addUser = (req, res, next) => {
  console.log('addUser BODY', req.body);
  const { user, chat } = req.body;
  const queryText = `INSERT INTO chat_user_assn (chat_id, username) 
  VALUES (${chat}, ${user});`
  console.log(queryText);

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at queryUser middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' }
      });
    }
    console.log('addUser results: ', results.rows);
    if (results.rows[0]) return next();
    return;
  });
};


module.exports = chatController;

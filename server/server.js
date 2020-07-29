const express = require('express');
const path = require('path'); // for chat
const http = require('http'); // for chat
const app = express(); 
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const model = require('./Models/model');
const signUpRouter = require('./Routers/signupRouter');
const exploreRouter = require('./Routers/exploreRouter');
const submitRouter = require('./Routers/submitRouter');
const loginRouter = require('./Routers/loginRouter');
const profileRouter = require('./Routers/profileRouter');
const flash = require('express-flash');
const initializePassport = require('./passport');
const passport = require('passport');
initializePassport(passport);
require('dotenv').config();
const PORT = 3000;

// socket
const server = http.createServer(app);
const io = socketio(server); // Socket.io -> make server working


// ! Implementing web sockets
io.on('connection', (socket) => {
  console.log("We Have a new connection!!!")

  // socket.on will listen for events (emit 'join')
  socket.on('join' , ({name, room }) => { // get data from the client to server
    console.log(name,room); // logging the user's name and the room

    // ! socket built in methods
    socket.emit('message' , {user: 'admin', text: `${name}, welcome to the room ${room}`});
    socket.broadcast.to(room).emit('message', { user: 'admin' , text: `${name}, has joined`})

    // callback()
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id) // specific instance of the user's id

      io.to(room).emit('message', {user: name, text: message})
  });

  socket.on('disconnect' , () => {
    console.log('User had left!!!');
  })

})


/*
 * Handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/api/login', loginRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/submit', submitRouter);
app.use('/api/profile', profileRouter);






// globoal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/*
 * Start server
 */
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

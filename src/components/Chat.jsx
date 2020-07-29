// Create the page for the chat 

import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrieving data from the url
import io from 'socket.io-client/dist/socket.io'
import {withRouter} from "react-router"

let socket;

const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  // UseEffect occurs on component did mount and update
  useEffect(() => {
    const {name, room} = queryString.parse(location.search)

    socket = io('localhost:3000');

    setName(name);
    setRoom(room)

    console.log(socket)

    // Use socket emit 
    socket.emit('join', {name, room});

  }, ['localhost:3000', location.search]) // useEffect will trigger when values in array update


  return (
    <h1>Chat</h1>
  );
};

export default withRouter(Chat);
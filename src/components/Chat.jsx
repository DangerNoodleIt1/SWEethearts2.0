// Create the page for the chat

import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrieving data from the url
import io from 'socket.io-client/dist/socket.io';
import { withRouter } from 'react-router';

// Importing components
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';
import TextContainer from './TextContainer';

import './css/Chat.css';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]); // this stores all the messages in an array in state

	// ! UseEffect for user joining the room
	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io('localhost:3000');
		// setting the name and the room
		setName(name);
		setRoom(room);
		socket.emit('join', { name, room }, () => {}); // same as name: name. Sends name and room to server
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
  }, ['localhost:3000', location.search]); // useEffect will trigger when values in array update
  

  // ! UseEffect to populate messages
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log("this is room " + room)
    // create the fetch request
    fetch('/api/joinchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({room})
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++){
          data[i].user = data[i].username
          data[i].text = data[i].messages
        }
        console.log("this is data: " , data)
        setMessages(data);
      });
  }, []);


	// ! UseEffect for user sending a message. also send each message to hte database
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	// function for sending message
	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	console.log(message);
	console.log("this is end result message " + messages);

	// ! JSX
	return (
		<div className="outerContainer">
			<div className="container2">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			{/* <TextContainer/> */}
			{/* <TextContainer users={users}/> */}
		</div>
	);
};

export default withRouter(Chat);

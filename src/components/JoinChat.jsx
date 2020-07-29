import React, {useState} from 'react';
import {Link} from 'react-router-dom'


const JoinChat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');


  return (
    <div>
      <h1>Join</h1>
      <div>
        <input placeholder = "Name" type="text" onChange = {(event) => setName(event.target.value)}/>
      </div>
      <div>
        <input placeholder = "Room" type="text" onChange = {(event) => setRoom(event.target.value)}/>
      </div>
      <Link onClick = {event => (!name || !room) ? event.preventDefault() : null } to = {`/chat?name=${name}&room=${room}`}>
        <button>Join Chat</button>
      </Link>
    </div>
    
  )
}


export default JoinChat;
import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import './css/Join.css';
import {withRouter} from "react-router"

const JoinChat = (props) => {

  // console.log(props.location.state.idea_id)
  const room = props.location.state.idea_id

  const [name, setName] = useState('');
  // const [room, setRoom] = useState(''); 


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
    
  )
}


export default withRouter(JoinChat);

// Create the page for the chat 

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

import io from 'socket.io-client';
// const socket = io();





const Chat = (props) => {

  useEffect(() => {
    socket = io('localhost:3000');
  })
 
  return (
    <div className="login-container">
      <div className="login-box">
        <center>
          <h4>Chat Page!</h4>
        </center>
      </div>
    </div>
  );
};

export default Chat;
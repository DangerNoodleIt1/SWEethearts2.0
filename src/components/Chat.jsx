// Create the page for the chat 

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Chat = (props) => {
  const { authStatus, setAuthStatus } = props;

  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: '',
  });

  //used to toggle error message if auth fails
  //as well as redirect if auth succeeds
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginInputs;
    const body = {
      username,
      password,
    };
    let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      setLoginStatus(true);
      setAuthStatus({ isLoggedIn: true, username });
    } else setLoginStatus(false);
  };

  const setInput = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.id]: e.target.value });
  };

  return loginStatus || authStatus.isLoggedIn ? (
    <Redirect to={{ pathname: '/explore' }} />
  ) : (
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
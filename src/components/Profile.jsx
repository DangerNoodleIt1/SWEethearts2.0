import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/user-profile.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios'

// We access the profile from 2 different places.
const Profile = (props) => {
	/*
	 * Possible Props:
	 * creatorUsername (possibly) passed in from IdeaPage
	 * authStatus always passed in from App
	 */

	let { ideaCreator, authStatus } = props.location.state;

	// Destructure currently authenticated user's username from authStatus
	let { username } = authStatus;

	// Initialize creator name-to-display to currently authenticated user
	let creatorName = ideaCreator;

	// Accessing Profile from Idea Page.
	if (ideaCreator) {
		// If logged-in user is _not_ clicking on their own profile picture,
		// RESET name-to-display to that of the User being clicked by logged-in User
		// if (loggedInUsername !== ideaCreator) {
		//   creatorName = ideaCreator;
		// }
	}
	// Set up user data to display on Profile
	const [userData, setUserData] = useState({});

	// componentDidMount() functional equivalent
	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => { // getting the specific user data
		// Get all existing user data, sending username as a parameter
		const res = await fetch(`/api/profile/${creatorName}`);
		// const res = await fetch(`/api/profile/seungho`);

		// Expect in response an object with all User table column properties
		const userTableData = await res.json();
		setUserData(userTableData);
	};

	console.log(userData);

	/* 
   * PROFILE COMPONENT USER FLOW:

   *   Case 1: Viewing your own profile (READ and WRITE)
   *       On first render, display all data in this DB row (distinguished by `username`)
   *       
   *       If current User clicks edit, then submit:
   *         1a. Send all data stored from initial GET request
   *         1b. Except for the modified fields, whose values will be set to User input
   * 
   *   Case 2: Viewing another User's profile (whether or not you're a registered user)
   *     Same page without edit button functionality (READ-ONLY)
  */

	// if there is no userData, then return the loader
	if (!Object.keys(userData).length) {
		return <Spinner />;
	} else if (userData.err) {
		// if error return error
		return <Container>Could not load user</Container>;
	}

  // if there is the user return all data associated. 
	return (
		<Container id="userProfileContainer">
			<Row className="mb-4" id="row1">
				<h3>{userData.firstname}'s Developer Profile</h3>
				<img id="profilePic" src={userData.profilepic} />
				<Link
					to={{
						pathname: '/editprofile',
						state: {
              authStatus: authStatus,
              
            },
            userData: userData
					}}
				>
					<button>Edit Profile</button>
				</Link>
          About {userData.firstname}: {userData.about}
			</Row>
      <Row>
        
      </Row>
			<Row id="row2">
				{/* <Col className="cardHeader" id="bioCard">
        <Fragment>About {userData.firstname}</Fragment>
				</Col> */}
				<Col className="cardHeader ml-5" id="contactInfoCard">
					<Fragment>Where else can your future teammates contact you?</Fragment>
				</Col>
			</Row>
		</Container>
	);
};

export default withRouter(Profile);

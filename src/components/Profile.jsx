import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row, Button, ListGroup } from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/user-profile.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

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

	console.log(authStatus);
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

	//functional equivalent
	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		// getting the specific user data
		// Get all existing user data, sending username as a parameter
		const res = await fetch(`/api/profile/${username}`);
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
				<h3 className="display-4">Developer Profile</h3>
				<img id="profilePic" src={userData.profilepic} />
				<Link
					to={{
						pathname: '/editprofile',
						state: {
							authStatus: authStatus,
						},
						userData: userData,
					}}
				>
					<Button variant="secondary">Edit Profile</Button>
				</Link>
			</Row>
			<ListGroup>	
				<ListGroup.Item className="mb-2">Name: {userData.firstname}</ListGroup.Item>
				<ListGroup.Item className="mb-2">About: {userData.about}</ListGroup.Item>
				<ListGroup.Item className="mb-2">Experience: {userData.experience}</ListGroup.Item>
				<ListGroup.Item className="mb-2">Github: {userData.githubhandle}</ListGroup.Item>
				<ListGroup.Item className="mb-2">Linkedin: {userData.linkedin}</ListGroup.Item>
			{/* <ListGroup.Item className="mb-2" id="row2">Contact: */}
				{/* <Col className="cardHeader" id="bioCard">
        <Fragment>About {userData.firstname}</Fragment>
				</Col> */}
				{/* <Col className="cardHeader ml-5" id="contactInfoCard">
					<Fragment>Contact Card</Fragment>
				</Col> */}
			{/* </ListGroup.Item> */}
			</ListGroup>
			<div className="contact-img">
				<Link className="mx-auto">
					<img id="contact-logo" width="70" height="70" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEU7WZj///88WpdAXZpBX5tFY51FYZ3t7/V6jbgoS48vUJLS2OdSa6M3VZZuhLK2wNf3+fvd4u2Imr9NaKHEzeDv8ffh5uxje6ns7/E4V5oxUpjW3eR7j7Rddank6PHByt6dq8uQoMMjR42VpMCLnbvDzNmsuM20v9FVb6KntdFieqy0v9i8xtyYqMl+kbsdQYosT5qClrY1QXhgAAAE+ElEQVR4nO3dbXuiOBSA4QACBhoE8aVa8XWcqqjd/v8/t6LtzuzsKgdiICfXeb7ONZG7QaMGWmbdGr1/Zqnnei7+PM9Lxz+2/peM3Xyb3WTCDOqiGf98/SXcjs3yXZuI7tu3cOFO2z4cBdlsmr3dhFvPvAm8Nc1GhXA0NnEGiy6zOIsvwo2pM1jkvFtstDNZOIli9m4ykDFvy2ZmC50Z27V9DIrbMa/tQ1CcxzptH4LabIeE2CMh/kiIPxLij4T4IyH+SIg/EuKPhPgjYduJouCa+KdKI+grvMGE7bnpy7U0dV3Psb//5QtdOo6ewsIgvKy72h/DMJn7vj8vSpIkDAeLXr5frvrn6JClrl06lobCYoacQ7+XxLH1oPiSP8+9slnUTih4kHb380e235unQcmAegltwdlhH0J5lxIXl5CLKAdPH0JhwLPcL0fhFXK2rOpDJRTrqMrzD58wCE7VJxCTMHD2dXx4hLzTqwfEIuTpoCYQiTBwawNRCO3ArnuK4hDaQizrAzEIGe8//AiBX8gPiQQQgVCwowwQgVDuHEUgFI7UOaq/UAQnOaD2wuCl2uddhELZKdRdKFzJZ6HuQlv2hVR7IRP133HjEAaHWh/rEQnXJ+mTVG+hCORPUr2F8ouh7kJ+HsoLtd634FW+Xhsm4eLYy/+st9R470nA14rhYHnOUufyzBV/FOi8QxpA39DE+YFxHvxHB9zxbk/IgathEgW82s79v2tReAathmEGOBMf1aJwBQHOM6kJZK0+D0EvpX1ZYHtCIXIAcOCULXeltSdkC4DwxKUfqDVh0AEsh/MDZiFkO2bgSZ+kLQpTwKZ2T3KlKNJbuJQ/SVsUvpQL45XpwmF/Lf9AegvPvPzaw7K0FvpdEgIiobJISEJwJFQWCUkIjoTKIiEJwZFQWSQkITgSKst4oQ0UPuGRVAoFv99HByCMPh6MUAT40l+lUKTR/Q7n8m384fLwYITrKO3u4wfnoX+/IWCT+9H/v47RW5cSVQp5v9wg2b78S3HcwnhlvBDwYotbOMzKX0xxC/203ddS9cKEmS4ctLziqxfmgHd1qIUxZJ8ft7BvvDAyXQhZDnEL54DlELcwdEwXHgELPm7hHnLZG2ZhvIJcuYhaeDZeGJku9HemC5PSu7qwCweQ5RC1MIcsh6iFJ9BvMsUs7IMu5McsBC0WmIUx5LMTauH8BXQzBmJhWHoLMHbhArRYYBbuYb/2WqlwpVS4hN31pXSHNOrdLz+W3+gcD/L7Axwj2F1faq9U+P8bzK+tAXd2+d2PByMAb2trTchBwrU0UPurTfBeT2P+FUMkJCE8EiqLhCQER0JlkZCE4EioLBKSEBwJlUVCEoIjobJISEJwJFQWCUkIjoTKIiEJwZFQWSQkITgSKouEJARHQmWRkITgSKgsEpIQHAmVRUISgiOhskhIQnAkVBYJSQiOhMoiIQnBkVBZJCQhOBIqi4TPFDpPON7qNSl0n3C81WtO6LLxE463eo0JL77Pifwo1WtM2PnBtkYLRfrGXseTJ5wLVWtKOJnFzPr5jCOuWkNC4W0tZr12p6zxWWxION3EF6H1lk2fctRVakb41+zVKoRtEJsQikkBvAqt0cxp+BVV/V+0EhN3UwBvQiveRp7T5Ps3kPBcX+g46Wx7+4NL7Gu4ePuZpa7XVCwLrfhxF6GoO3w63rx9/6D+BncElkevYj5cAAAAAElFTkSuQmCC" alt="facebook"/>
				</Link>
				<Link>
				<img id="contact-logo" width="80" height="80" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/google_circle_color-512.png" alt="gmail"/>
				</Link>
				<Link>
					<img id="contact-logo" width="75" height="80" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgu2TCghgRqG7TUyQQILoINsa4GZ0BEYLY0A&usqp=CAU" alt="twitter"/>
				</Link>
			</div>
		</Container>
	);
};

export default withRouter(Profile);

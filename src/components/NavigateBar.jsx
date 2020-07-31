import React from 'react';
import {
	Navbar,
	Nav,
	Button /* Form, FormControl, Button, Container */,
} from 'react-bootstrap';
import '../styles/navigateBar.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

const NavigateBar = (props) => {
	// make a conditional -- if props.authStatus.username exists, display one set, else another set

	// create a function that will make a get request to the route
	const logout = async () => {
		//  create the get request to hit the logout middleware
		console.log('hello');
		await axios.get('/api/logOut');
		window.location.reload();
	};
	console.log(props.authStatus);
	return props.authStatus.isLoggedIn ? (
		<Navbar className="color-nav" variant="light" sticky="top">
			{/* Leftside Nav Logo/Link */}
			{/* TODO: Point this href to `/explore` if User is authenticated */}
			<Link to="/">
				<Navbar.Brand>
					<img
						src='https://codev.com/wp-content/uploads/2017/07/codev_logo_red_400.png'
						width="120"
						height="40"
						className="d-inline-block align-top"
						alt="React Bootstrap Logo"
					/>
				</Navbar.Brand>
			</Link>
			{/* Rightside Nav Links */}
			{/* Set class for Login and Signup button Nav item to `margin-left: auto;`*/}
			<Nav className="ml-auto">
				{/* TODO: Remove inline styling in favor of Bootstrap or separate stylesheet */}
				<Link
					to={{
						pathname: '/profile',
						state: {
							ideaCreator: props.authStatus.username,
							authStatus: props.authStatus,
						},
					}}
				>
					<Nav.Link style={{ color: 'white' }} href="/profile">
						Profile
					</Nav.Link>
				</Link>

				{/* temporary link to render submit idea page */}
				<Link to="/submit">
					<Nav.Link style={{ color: 'white' }} href="/submit">
						Submit Idea
					</Nav.Link>
				</Link>

				<Link to="/explore">
					{' '}
					<Nav.Link
						style={{ color: 'white' }}
						onClick={() => logout()}
						href="/explore"
					>
						Logout
					</Nav.Link>
				</Link>
			</Nav>
		</Navbar>
	) : (
		<Navbar className="color-nav" variant="light" sticky="top">
			{/* Leftside Nav Logo/Link */}
			{/* TODO: Point this href to `/explore` if User is authenticated */}
			<Link to="/">
				<Navbar.Brand>
					<img
						src='https://codev.com/wp-content/uploads/2017/07/codev_logo_red_400.png'
						width="120"
						height="40"
						className="d-inline-block align-top"
						alt="React Bootstrap Logo"
					/>
				</Navbar.Brand>
			</Link>
			{/* Rightside Nav Links */}
			{/* Set class for Login and Signup button Nav item to `margin-left: auto;`*/}
			<Nav className="ml-auto">
				{/* TODO: Remove inline styling in favor of Bootstrap or separate stylesheet */}

				{/* temporary link to render submit idea page */}

				<Link to="/login">
					<Nav.Link style={{ color: 'white' }} href="/login">
						Login
					</Nav.Link>
				</Link>
				<Link to="/signup">
					<Nav.Link style={{ color: 'white' }} href="/signup">
						Signup
					</Nav.Link>
				</Link>
			</Nav>
		</Navbar>
	);

	// // Search Bar Component
	// < Form inline >
	//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
	//   <Button variant="outline-light">Search</Button>
	// </Form >
};

export default withRouter(NavigateBar);

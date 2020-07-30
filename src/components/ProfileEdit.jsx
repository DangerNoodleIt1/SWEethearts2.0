import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ProfileEdit = (props) => {
	const { authStatus } = props;
  const { username } = authStatus;
  const [retrievedTechStacks, setRetrievedTechStacks] = useState([]);

  console.log("in profile edit ", props.location.userData)
  const {firstname, lastname, profilepic} = props.location.userData
  
  console.log(authStatus)

	if (props.location.authstatus) {
		console.log('console log in profileEdit ' + props.location.authstatus);
	}
	const [githubhandle, setGithub] = useState('');
	const [linkedin, setLink] = useState('');
	const [personalpage, setPersonPage] = useState('');
	const [about, setAbout] = useState('');
	// const [tech, setTechStack] = useState([]);
	const [occupation, setOccupation] = useState('');
	const [experience, setExperience] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	// useEffect(() => {
	// 	const fetchTechs = async () => {
	// 		const results = await axios.get('/api/submit');
	// 		// array of objects with id and name. need to filter for just names

	// 		const techNamesList = results.data.map((el) => el.name);
	// 		// console.log('techNamesList', techNamesList);
	// 		setRetrievedTechStacks(techNamesList);
	// 		// console.log('techStacks', techStacks);
	// 	};

	// 	fetchTechs();
	// 	// console.log('techStacks', techStacks);
	// }, []);

	const handleChange = (e) => {
		const { id, value } = e.target;
		switch (id) {
      case 'about':
				setAbout(value);
				break;
			case 'githubhandle':
				setGithub(value);
				break;
			case 'linkedin':
				setLink(value);
				break;
			case 'personalpage':
				setPersonPage(value);
				break;
			case 'occupation':
				setOccupation(value);
				break;
			case 'experience':
				setExperience(value);
				break;
			case 'profilepic':
				setImageURL(value);
				break;
			default:
				console.log('not working');
		}
	};
	// const techIDConverter = (techs) => {
	// 	const result = techs.map((el) => retrievedTechStacks.indexOf(el) + 1);
	// 	return result;
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		// convert tech stack into tech stack id
    // const techStackID = techIDConverter(techStack);
    // const data = { "firstname" :"seungho", "lastname" :"baek", "about" :"1", "profilepic" : "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png", "githubhandle" :"5", "username":"seungho","linkedin":"1","personalpage":"1","experience": "1234", "occupation" : "seungho4","tech_stacks": "reactasdasd"}


		const data = {
      firstname,
      lastname,
      about,
      profilepic,
			githubhandle,
      username ,
      linkedin,
      personalpage,
      experience,
      occupation,
      tech_stacks: ""
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

    console.log('data inside ProfileEdit ', data);
    

		try {
			let res = await axios.post('./api/profile',
			JSON.stringify(data),
			config)
		} catch (e) {
			console.log(e.response) // undefined
		}


		// let response = await fetch(
		// 	`http://localhost:3000/api/profile/`,
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(data),
		// 	}
		// );

		// if (response.status === 200) {
		//   console.log('fetch post success')
		// } else
		//   setErrorMsg('New user could not be created - duplicate username/email');

		// const res = await axios.post('/api/profile/', data, config);
		// console.log('reached here ', res);
		// console.log('reached after ' + JSON.stringify(res));
		// const testInfo = await axios.get('http://localhost:3000/api/profile/hello');
		// await axios.post(
		// 	'http://localhost:3000/api/profile/',
		// 	JSON.stringify(data),
		// 	config
		// ); // making a post request with the data
		// setIsSubmitted(true);
	};

	return (
		<Container style={{ marginTop: 50 }}>
			<div>Edit Profile Page</div>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Row>
					<Col md={6}>
						<Form.Group controlId="about">
							<Form.Label>About</Form.Label>
							<Form.Text className="text-muted">
								Tell us about yourself
							</Form.Text>
							<Form.Control
								name="ideaName"
								onChange={handleChange}
								type="text"
							/>
						</Form.Group>

						<Form.Group controlId="experience">
							<Form.Label>Experience</Form.Label>
							<Form.Text className="text-muted">
								Why do feel passionate about this idea?
							</Form.Text>
							<Form.Control onChange={handleChange} type="text" />
						</Form.Group>

						<Form.Group controlId="tech">
							<Form.Label>Tech Stack</Form.Label>
							<Form.Text className="text-muted">
								What technologies do you use?
							</Form.Text>
							{/* <Typeahead
							// id="techStacks"
							// labelKey="name"
							// multiple
							// onChange={setTechStack}
							// options={retrievedTechStacks}
							// selected={techStack}
							/> */}
						</Form.Group>

						<Form.Group controlId="occupation">
							<Form.Label>Occupation</Form.Label>
							<Form.Text className="text-muted">Where do you work?</Form.Text>
							<Form.Control onChange={handleChange} type="text" />
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="profilepic">
							<Form.Label>Upload Profile Image: </Form.Label>
							<Form.Text className="text-muted">
								for now, put a image source url
							</Form.Text>
							<Form.Control onChange={handleChange} size="lg" type="text" />
						</Form.Group>

						<Form.Group controlId="githubhandle">
							<Form.Label>Github</Form.Label>
							<Form.Text className="text">Github</Form.Text>
							<Form.Control onChange={handleChange} type="text" />
						</Form.Group>
						<Form.Group controlId="linkedin">
							<Form.Label>LinkedIn</Form.Label>
							<Form.Text className="text">
								Desired Number of Teammates
							</Form.Text>
							<Form.Control onChange={handleChange} type="text" />
						</Form.Group>
						<Form.Group controlId="personalpage">
							<Form.Label>Personal Page</Form.Label>
							<Form.Text className="text">
								Enter your Personal website
							</Form.Text>
							<Form.Control onChange={handleChange} type="text" />
						</Form.Group>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button variant="primary" type="submit">
								SUBMIT
							</Button>
							{'   '}
							<Button
								href="/explore"
								style={{ marginLeft: 10 }}
								variant="outline-primary"
								type="link"
							>
								CANCEL
							</Button>
						</div>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default withRouter(ProfileEdit);

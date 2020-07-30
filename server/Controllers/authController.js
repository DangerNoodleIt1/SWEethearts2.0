const bcrypt = require('bcrypt');
const model = require('../Models/model.js');

const authController = {};

authController.loggedIn = async (req, res, next) => {
	const userPassport = req.user;
	console.log(req.session);
	if (userPassport) {
		res.locals.isLoggedIn = { isLoggedIn: true };
		res.locals.user = userPassport.username;

		next();
	} else {
		res.locals.isLoggedIn = { isLoggedIn: false };
		next();
	}
};

// create logout button to hit middleware, when logged out, will set isLoggedIn: false
authController.logOut = async (req, res, next) => {
	console.log('inside the authController');

	req.user = undefined;
	res.locals.isLoggedIn = { isLoggedIn: false };
	res.locals.user = '';
	next();
};

authController.register = async (req, res, next) => {
	const { username, password, email, firstname, lastname } = req.body;
	const queryText = `INSERT INTO User_credentials (username,password,email) VALUES ($1,$2,$3)`;
	const usersQueryText = `INSERT INTO Users (username, firstname, lastname) VALUES($1,$2,$3)`;
	const hashedPassWord = await bcrypt.hash(password, 10);
	try {
		await model.query(queryText, [username, hashedPassWord, email]);
		await model.query(usersQueryText, [username, firstname, lastname]);
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: `error occurred at register middleware. error message is: ${err}`,
			status: 400,
			message: { err: 'An error occurred' },
		});
	}
};

// ToDO : new columns in the Users table, about, linkedin, personal url
// new table to link users to tech stack(association table),
// signup new fields for firstname and lastname

// middleware for get profiles
authController.getProfile = async (req, res, next) => {
	console.log('this get profile ' + req.body);
	const { username } = req.params;
	const queryText = `SELECT * FROM Users WHERE username=$1`;
	try {
		const userData = await model.query(queryText, [username]);
		[res.locals.userData] = userData.rows;
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: `error occurred at getProfile middleware. error message is: ${err}`,
			status: 400,
			message: { err: 'An error occurred' },
		});
	}
};

// middeware to edit profiles (INCOMPLETE)
authController.editProfile = async (req, res, next) => {
	console.log('inside auth Controller ' + req.body.firstname); // body is getting info
	const {
		firstname,
		lastname,
		about,
		profilepic,
		githubhandle,
		username,
		linkedin,
		personalpage,
		experience,
		occupation,
		tech_stacks,
	} = req.body;

	console.log('we are here');

	// Sets based off of the username
	const queryText = `UPDATE Users
  SET firstname=$1,
      lastname=$2,
      about=$3,
			 profilepic=$4,
       githubhandle=$5,
       username = $6,
			 linkedin=$7,
       personalpage=$8,
       experience=$9,
       occupation=$10,
       tech_stacks=$11

	WHERE username=$6`;

	const queryValue = [
		firstname,
		lastname,
		about,
		profilepic,
		githubhandle,
		username,
		linkedin,
		personalpage,
		experience,
		occupation,
		tech_stacks,
	];

	try {
		await model.query(queryText, queryValue);
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: `error occurred at getProfile middleware. error message is: ${err}`,
			status: 400,
			message: { err: 'An error occurred1111' },
		});
	}
};

module.exports = authController;

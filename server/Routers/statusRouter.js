const express = require('express');
const authController = require('../Controllers/authController.js');
const passport = require('passport');

const router = express.Router();

router.get('/', authController.loggedIn, (req, res) => {
	res.status(200).send([res.locals.isLoggedIn, res.locals.user]);
});

module.exports = router;

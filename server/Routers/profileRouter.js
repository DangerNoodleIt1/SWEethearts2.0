const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

router.get('/hello', (req, res) => {
	res.status(205).send({ id: 'hello' });
});

// get router for explore page
router.get('/:username', authController.getProfile, (req, res) => {
	// console.log('res.locals.ideas', res.locals.ideas);
	res.json(res.locals.userData);
});

// Make a post request to update the specific profile
router.post('/', authController.editProfile, (req, res) => {
	res.status(200);
});


module.exports = router;

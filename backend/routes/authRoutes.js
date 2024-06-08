const express = require('express');
const authControllers = require('../controllers/authControllers');
const cors = require('cors');
const userController = require('../controllers/user');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/users', userController.getUser, authMiddleware.authenticateToken);

module.exports = router;

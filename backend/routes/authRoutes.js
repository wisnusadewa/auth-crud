const express = require('express');
const authControllers = require('../controllers/authControllers');
const userController = require('../controllers/user');
const authMiddleware = require('../utils/authMiddleware');
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/users', userController.getUser, authMiddleware.authenticateToken);

module.exports = router;

const express = require('express');
const authControllers = require('../controllers/authControllers');
const cors = require('cors');
const userController = require('../controllers/user');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
// router.use(cors());
const corsConfig = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

router.post('/signup', cors(corsConfig), authControllers.signup);
router.post('/login', cors(corsConfig), authControllers.login);
router.get('/users', cors(corsConfig), userController.getUser, authMiddleware.authenticateToken);

module.exports = router;

const router = require('express').Router();
const models = require('../../models');
const authController = require('../../controllers/AuthController.js');
const magnamentController = require('../../controllers/managementController.js');
const bcrypt = require('bcryptjs');

// Route Api - User 
router.get('/', magnamentController.listUsers);

// Route Api - User - Register 
router.post('/register', magnamentController.register);

// Route Api - User - Register 
router.post('/signin', authController.signin);


module.exports = router;
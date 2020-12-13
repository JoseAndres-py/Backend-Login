const router = require('express').Router();
const models = require('../../models');
const userController = require('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');

// Route Api - User 
router.get('/', async(req, res) => {
    const user = await models.user.findAll(); 
    res.status(200).json(user);
});


// Route Api - User - Register 
router.post('/register', async(req, res) => {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    console.log(req.body)
    const user = await models.user.create(req.body);
    res.status(200).json(user);
});

// Route Api - User - Register 
router.post('/signin', userController.signin);


module.exports = router;
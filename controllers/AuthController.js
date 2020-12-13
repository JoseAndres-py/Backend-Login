const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async(req, res, next) => {
    try {
        console.log(req.body)
        const user = await models.user.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                }, 'config.secret',{
                    expiresIn: 8400
                });
                res.status(200).send({
                    accessToken: token
                });
            }else{
                res.status(401).send({ 
                    auth: false, 
                    accessToken: null, 
                    reason: "Invalid Password!" 
                });
                    
            }
        }else{
            res.status(404).send('User Not Found.');

        }
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
        next(error);
    }
}

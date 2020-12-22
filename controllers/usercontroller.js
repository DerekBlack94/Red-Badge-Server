
const router = require('express').Router();
const {User} = require('../models/');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');
const { response } = require('express');

//* SIGN UP

router.post('/register', async (req, res) => {
    let {firstName, lastName, email, password, admin } = req.body;

    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            admin
        })
        res.status(201).json({
            message: "User registerd!",
            user: newUser
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError){
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: "Failed to register user."
            })
        }
    }
});

//* User Login

router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    try {
        let loginUser = await User.findOne({
            where: { email }
        })
        //console.log("loginUser", loginUser)
        if(loginUser && await bcrypt.compare(password, loginUser.password)) {
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})//*86,400 secounds in a day

            res.status(200).json({
                message: 'Login succeeded!',
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                message: 'Login Failed: user infromation incorrect.'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: 'Error logging in!'
        })
        
    }
})




module.exports = router;
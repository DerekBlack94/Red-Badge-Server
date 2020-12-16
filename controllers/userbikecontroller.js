let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const UserBike = require('../models/userbike');

const UserBike = require('../db').import('../models/userbike');

router.post('/create', validateSession, (req, res) => {
    const UserBikeCreate = {
        make: req.body.userbike.make,
        model: req.body.userbike.model,
        year: req.body.userbike.year,
        color: req.body.userbike.color,
        size: req.body.userbike.size,
        tireSize: req.body.userbike.tireSize,
        userInput: req.body.userbike.userInput,
        owner: req.user.id,
    }
    UserBike.create(UserBikeCreate)
    .then(userbike => res.status(200).json({
        userbike,
        message: "User BIke Created"
    }))
    .catch(err => res.status(500).json({ error: err}))
});

router.put('/:id', validateSession, (req, res) => {
    const updateUserBike = {
        make: req.body.userbike.make,
        model: req.body.userbike.model,
        year: req.body.userbike.year,
        color: req.body.userbike.color,
        size: req.body.userbike.size,
        tireSize: req.body.userbike.tireSize,
        userInput: req.body.userbike.userInput,

    };

    const query = {where: {id: req.params.id, owner: req.user.id}};

    UserBike.update(updateUserBike, query)
        .then((userbikes) => res.status(200).json({
            updateUserBike,
            message: "Users Bike successfully updated!"
        }))
        .catch((err) => res.status(500).json({ error: err }))
})

//**GET ALL BIKES */

router.get("/", validateSession, (req, res) =>{
    let userid = req.user.id

    UserBike.findAll({
        where: { owner: userid }
    })
    .then(userbike => res.status(200).json(userbike))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//**DELETE */

router.delete("/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id} };


    UserBike.destroy(query)
    .then(() => res.status(200).json({ message: "User Bike Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});

module.export = router;



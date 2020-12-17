const express = require('express');
const router = express.Router();
const Appointments = require('../models/appointments');

const validateSession = require('../middleware/validate-session');

// const Appointments = require('../db').import('../models/appointments');

router.post('/create', validateSession, (req, res) => {
    const AppointmentsCreate = {
        savedDate: req.body.appointments.savedDate,
        userInput: req.body.appointments.userInput,
        owner: req.user.id,
    }
    Appointments.create(AppointmentsCreate)
    .then(appointment => res.status(200).json({
        appointment,
        message: "Appointment Created"
    }))
    .catch(err => res.status(500).json ({ error: err}))
});

router.put('/:id', validateSession, (req, res) => {
    const updateAppointments = {
        savedDate: req.body.appointments.savedDate,
        userInput: req.body.appointments.userInput,

    };
    const query ={where: {id: req.params.id, owner: req.user.id}};

    Appointments.update(updateAppointments, query)
    .then((appointments) => res.status(200).json({
        updatedAppointments,
        message: "Appointment Updated" 
    }))
    .catch((err) => res.status(500).json({error: err}))
})

//**GET ALL APPOINTMENTS */


router.get("/", validateSession, (req, res) =>{
    let userid = req.user.id

    UserBike.findAll({
        where: { owner: userid }
    })
    .then(appointment => res.status(200).json(appointment))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//**delete APPOINTMENTS */

router.delete("/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id} };


    Appointments.destroy(query)
    .then(() => res.status(200).json({ message: "Appointment Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;
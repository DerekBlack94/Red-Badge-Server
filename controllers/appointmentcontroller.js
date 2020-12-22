const express = require('express');
const router = express.Router();
const Appointments = require('../models/appointments');

const validateSession = require('../middleware/validate-session');

// const Appointments = require('../db').import('../models/appointments');

router.post('/create', validateSession, async (req, res) => {
    try{
    const addAppointment = await Appointments.create  ({
        savedDate: req.body.appointments.savedDate,
        userInput: req.body.appointments.userInput,
        owner: req.user.id,
    })
    res.status(200).json({
        appointments: addAppointment,
        message: "Appointment Added"
    })
    // Appointments.create(AppointmentsCreate)
    // .then(appointment => res.status(200).json({
    //     appointment: addAppointment,
    //     message: "Appointment Created"
    // }))
} catch (err){
    res.status(500).json({
        error: err
    })
}
})
// (err => res.status(500).json ({ error: err}))
// });
//**UPDATE APPOINTMENT */

router.put('/:id', validateSession, async (req, res) => {
    console.log(req.user.id, req.params.id)
    const updatedAppointments = {
        savedDate: req.body.appointments.savedDate,
        userInput: req.body.appointments.userInput,
        

    };
    try{

    const query = req.params.id;
    // {where: {id: req.params.id, owner: req.user.id}};

    // Appointments.update(updateAppointments, query)
    await Appointments.update(updatedAppointments, {where: {id: query}})
    .then((updatedAppointments) => {
        Appointments.findOne({where: {id: query}})
        .then((locatedUpdatedAppointment) => {
            res.status(200).json({
                updated: locatedUpdatedAppointment,
                message: "Appointment Updated",
                newAppointment: updatedAppointments,
            })
        })
    })
    } catch (error) {
        res.status(500).json({
            message: "update Failed",
            error: error
        })
    }
}),
    // res.status(200).json({
    //     updatedAppointments,
    //     message: "Appointment Updated" 
    // }))
//     .catch((err) => res.status(500).json({error: err}))
// });

//**GET ALL APPOINTMENTS */


router.get("/", validateSession, async (req, res) => {
    let query = req.user.id
    try{

     let searchedAppointments = await Appointments.findAll({
        where: { owner: query },
        // include: 'user'
    })
    res.status(200).json({
        searchedAppointments: searchedAppointments,
        message: "Set Appointments"
    })
} catch (error) {
    res.status(500).json({
        message: "Appointment Search Failed",
        error: error
    })
}
//     .then(appointment => res.status(200).json(appointment))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
})

//**delete APPOINTMENTS */

router.delete("/:id", validateSession, async (req, res) => {
    // const query = { where: { id: req.params.id, owner: req.user.id} };
    try{
    const query = req.params.id;
    await Appointments.destroy({where: {id: query}})
    .then((deletedAppointment) => {
        Appointments.findOne({where: {id: query}})
        .then((locatedDeletedAppointment) => {
            res.status(200).json({
                deletedAppointment: deletedAppointment,
                message: "Appointment deleted",
                locatedDelete: locatedDeletedAppointment
            })
        })
    });
} catch (error) {
    res.status(500).json({
        error: error,
        meesage: "failed to delete Appointment"
    })
}


    // Appointments.destroy(query)
    // .then(() => res.status(200).json({ message: "Appointment Removed"}))
    // .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;
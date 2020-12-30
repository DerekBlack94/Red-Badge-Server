const express = require('express');
const router = express.Router();
const Appointments = require('../models/appointments');

const validateSession = require('../middleware/validate-session');

// const Appointments = require('../db').import('../models/appointments');

router.post('/create', validateSession, async (req, res) => {
    try{
    await Appointments.create  ({
        savedDate: req.body.appointments.savedDate,
        userInput: req.body.appointments.userInput,
        
        userId: req.user.id,
    })
    // res.status(200).json({
    //     appointments: addAppointment,
    //     message: "Appointment Added"
    // })
    // Appointments.create(AppointmentsCreate)
    .then(appointment => res.status(200).json({
        // appointment: addAppointment,
        message: "Appointment Created"
    }))
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
    // console.log(req.user.id, req.params.id)
    console.log(req.user.role)
    const userAppointment = await Appointments.findOne({ where:{ id: req.params.id}})
    // console.log(userAppointment)
    // console.log(userAppointment.userId)
    // console.log(req.user.id)
    
    // console.log(req.user.id)
    
    // {where: {id: req.params.id, owner: req.user.id}};
    try{
        
        
        if(userAppointment.userId === req.user.id || req.user.role === "admin"){
            const query = req.params.id;
            const updatedAppointments = {
                    savedDate: req.body.appointments.savedDate,
                    userInput: req.body.appointments.userInput,
                
                
                };

        let locatedUpdatedAppointment = await Appointments.findOne({where: {id: req.params.id}})
         Appointments.update(updatedAppointments, {where:{id: query}})
        
   
        .then((updatedAppointments) => {
            res.status(200).json({
                updated: locatedUpdatedAppointment,
                message: "Appointment Updated",
                newAppointment: updatedAppointments
            })
            .catch((err) => {
                console.log(err)
            }) 
        })} else {
            res.status(403).json({
                error: "not Authorized"
            })
        }
    
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
    const userAppointment = await Appointments.findOne({ where:{ id: req.params.id}})
    try{
        console.log(userAppointment.userId)
        console.log(req.user.id)
        
        if(userAppointment.userId === req.user.id || req.user.role === "admin"){
        const query = req.params.id;
     let locatedDeletedAppointment = await Appointments.findOne({where: {id: query}})
    // .then((deletedAppointment) => {
        Appointments.destroy({where: {id: query}})
        .then((deletedAppointment) => {
            res.status(200).json({
                deletedAppointment: deletedAppointment,
                message: "Appointment deleted",
                locatedDelete: locatedDeletedAppointment
            })
            .catch((err) => {
                console.log(err)
            })
        })} else {
            res.status(403).json({
                error: "Not Authroized"
            })
        };
   
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
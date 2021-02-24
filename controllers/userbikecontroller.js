let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const UserBike = require('../models/userbike');

// const UserBike = require('../db').import('../models/userbike');

// const {UserBike} = require('../models')
//** create USER BIKE */

// router.post('/create', async (req, res) => {
//     try{

//     const addUserBike = await UserBike.create ({
//         make: req.body.userbike.make,
//         model: req.body.userbike.model,
//         year: req.body.userbike.year,
//         color: req.body.userbike.color,
//         size: req.body.userbike.size,
//         tireSize: req.body.userbike.tireSize,
//         userInput: req.body.userbike.userInput,
//         userId: req.user.id,
//     })
    
//      res.status(200).json({
//         userbike: addUserBike,
//         message: "User Bike Created"
//     })
// } catch(err){
//      res.status(500).json({
//           error: err
//         })
//     }
// }),

// router.post('/create', validateSession, async (req, res) =>{
//     try {

           
//            const {make, model, year, color, size, tireSize, userInput,} = req.body;
//            let newUserBike = await UserBike.create({
//                make, model, year, color, size, tireSize, userInput, userid: req.user.id
//             });
//             res.status(200).json({
//                 userBike: newUserBike,
//                 message: "User Bike Created!"
//             })
//         } catch (error) {
//             console.log(error);
            
        
//             res.status(500).json({
                
//                 message: "Bike Creation Failed."
//             });
            
//         }
        
//     });

router.post('/create', async (req, res) => {
    let {make, model, year, color, size, tireSize, userInput, taskColor, workers, dueDate } = req.body;

    try {
        const addUserBike = await UserBike.create({
            make,
            model,
            year,
            color,
            size,
            tireSize,
            userInput,
            taskColor,
            workers,
            dueDate,
        })
        res.status(201).json({
            message: "Bike registerd!",
            userbike: addUserBike,
            
        })
    
} catch (error) {
                console.log(error);
                
            
                res.status(500).json({
                    
                 message: "Bike Creation Failed."
                 });
                
             }
});

//**UPDATE USER BIKE */

router.put('/:id', async (req, res) => {
    let {make, model, year, color, size, tireSize, userInput, taskColor, workers, dueDate } = req.body;

    // try {
        const updatedUserBike = {
            make,
            model,
            year,
            color,
            size,
            tireSize,
            userInput,
            taskColor,
            workers,
            dueDate,
                //     make: req.body.userbike.make,
                //     model: req.body.userbike.model,
                //     year: req.body.userbike.year,
                //   color: req.body.userbike.color,
                //     size: req.body.userbike.size,
                //      tireSize: req.body.userbike.tireSize,
                //     userInput: req.body.userbike.userInput,
                //     taskColor: req.body.userbike.taskColor,
                //     workers: req.body.userbike.workers,
                //     dueDate: req.body.userbike.dueDate,
                      
        }
        // res.status(201).json({
        //     message: "Bike Updated!",
        //     userbike: addUserBike,
            
        // })
        try {
        
        // const query = {where: {id: req.params.id, owner: req.user.id}};
        const query = req.params.id;
        
         await UserBike.update(updatedUserBike, {where: { id: query}})
        
                .then((updatedUserBike) => {
                    UserBike.findOne({where:{ id: query}})
                    .then((locatedupdatedUserBike) => {
                        res.status(200).json({
                            updatedBike: locatedupdatedUserBike,
                            message: "User Bike Updated",
                            editUserBike: updatedUserBike,
                        })
                    })
                });
            } catch (error) {
                res.status(500).json({
                    message: "update Failed",
                    error: error
                });
            }
    
// } catch (error) {
//                 console.log(error);
                
            
//                 res.status(500).json({
                    
//                  message: "Bike Update Failed."
//                  });
                
//              }
});

// router.put('/:id', validateSession, async (req, res) => {
//     console.log(req.user.id, req.params.id)
//     const updatedUserBike = {

//         make: req.body.userbike.make,
//         model: req.body.userbike.model,
//         year: req.body.userbike.year,
//         color: req.body.userbike.color,
//         size: req.body.userbike.size,
//         tireSize: req.body.userbike.tireSize,
//         userInput: req.body.userbike.userInput
//         // bikes: req.body.bikes

//     };

    // }),
//         .then((userbikes) => res.status(200).json({
//             updateUserBike,
//             message: "Users Bike successfully updated!"
//         }))
//         .catch((err) => res.status(500).json({ error: err }))
// })

//**GET ALL BIKES */
router.get('/', async (req, res) => {
    try {
        let getUserBike = await UserBike.findAll({
            include: ['user']
        })
        res.status(200).json({
            getUserBike: getUserBike,
            message: 'All Appointments'
        })
    } catch (error) {
        res.status(200).json({ error: err })
    }
})


//**DELETE */



// router.delete("/:id", validateSession, async (req, res) => {
//     const userbike = await UserBike.findOne({where: {id: req.params.id}})
    
//     try{
//         console.log(userbike.userId)
//         console.log(req.user.id)
//         if(userbike.userId === req.user.id || req.user.role === "admin"){
//             const query = req.params.id;
//         let locatedDeletedBike = await UserBike.findOne({where: {id: query}})
        
//             UserBike.destroy({ where: {id: query}})
//             .then((deletedUserBike) => {
//                 res.status(200).json({
//                     deletedUserBike: deletedUserBike,
//                     message: "User Bike Deleted",
//                     locatedDelete: locatedDeletedBike
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//             })} else {
//                 res.status(403).json({
//                     error: "Not Authorized"
//                 })
//             };
        
//     } catch (error) {
//         res.status(500).json({
//             error: error,
//             message: "error bike not deleted"
//         })
//     }
// }),


router.delete('/:id', async (req, res) => {
    const userbike = await UserBike.findOne({where: {id: req.params.id}})

    try {

    
    const query = req.params.id;
    let locatedDeletedBike = await UserBike.findOne({where: {id: query}})
    
        UserBike.destroy({ where: {id: query}})
        .then((deletedUserBike) => {
            res.status(200).json({
                deletedUserBike: deletedUserBike,
                message: "User Bike Deleted",
                locatedDelete: locatedDeletedBike
            })
            .catch((err) => {
                console.log(err)
            })
        })} catch (error) {
            res.status(500).json({
                error: error,
                message: "error bike not deleted"
            })
        }

    
        // try {
        
        
        // const query = req.params.id;
        
        
        //  await UserBike.update(updatedUserBike, {where: { id: query}})
        
        //         .then((updatedUserBike) => {
        //             UserBike.findOne({where:{ id: query}})
        //             .then((locatedupdatedUserBike) => {
        //                 res.status(200).json({
        //                     updatedBike: locatedupdatedUserBike,
        //                     message: "User Bike Updated",
        //                     editUserBike: updatedUserBike,
        //                 })
        //             })
        //         });
        //     } catch (error) {
        //         res.status(500).json({
        //             message: "update Failed",
        //             error: error
        //         });
        //     }
    

    
});


module.exports = router;



let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const UserBike = require('../models/userbike');

// const UserBike = require('../db').import('../models/userbike');

// const {UserBike} = require('../models')
//** create USER BIKE */

router.post('/create', validateSession, async (req, res) => {
    try{

    const addUserBike = await UserBike.create ({
        make: req.body.userbike.make,
        model: req.body.userbike.model,
        year: req.body.userbike.year,
        color: req.body.userbike.color,
        size: req.body.userbike.size,
        tireSize: req.body.userbike.tireSize,
        userInput: req.body.userbike.userInput,
        owner: req.user.id,
    })
    
     res.status(200).json({
        userbike: addUserBike,
        message: "User Bike Created"
    })
} catch(err){
     res.status(500).json({
          error: err
        })
    }
}),

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

//**UPDATE USER BIKE */

router.put('/:id', validateSession, async (req, res) => {
    console.log(req.user.id, req.params.id)
    const updatedUserBike = {

        make: req.body.userbike.make,
        model: req.body.userbike.model,
        year: req.body.userbike.year,
        color: req.body.userbike.color,
        size: req.body.userbike.size,
        tireSize: req.body.userbike.tireSize,
        userInput: req.body.userbike.userInput
        // bikes: req.body.bikes

    };

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
    }),
//         .then((userbikes) => res.status(200).json({
//             updateUserBike,
//             message: "Users Bike successfully updated!"
//         }))
//         .catch((err) => res.status(500).json({ error: err }))
// })

//**GET ALL BIKES */

router.get("/", validateSession, async (req, res) => {
    console.log(req.params.id, req.user.id)
    let query = req.user.id
    try{

     let searchedUserBike = await UserBike.findAll({
        where: { owner: query },
        //  include: 'user'
    })
    res.status(200).json({
        searchedUserBike: searchedUserBike,
        message: "User Bikes"
    })
} catch (error) {
    res.status(500).json({
        message: "User Search Failed",
        error: error

    })
}
    // .then(userbike => res.status(200).json(userbike))
    // .catch(err => res.status(500).json({
    //     error: err
    // }))
}),

//**DELETE */



router.delete("/:id", validateSession, async (req, res) => {
    try{
        const query = req.user.id;
        await UserBike.destroy({where: {id: query}})
        .then((deletedUserBike) => {
            UserBike.findOne({ where: {id: query}})
            .then((locatedDeletedUserBike) => {
                res.status(200).json({
                    deletedUserBike: deletedUserBike,
                    message: "User Bike Deleted",
                    locatedDelete: locatedDeletedUserBike
                })
            })
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "error bike not deleted"
        })
    }
}),
//     const query = { where: { id: req.params.id, owner: req.user.id} };


//     UserBike.destroy(query)
//     .then(() => res.status(200).json({ message: "User Bike Removed"}))
//     .catch((err) => res.status(500).json({ error: err}));
// });

module.exports = router;



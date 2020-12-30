        const {DataTypes} = require('sequelize');
        const db = require('../db');



    const Appointments = db.define('appointments', {
        savedDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userInput: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    });
 
module.exports = Appointments
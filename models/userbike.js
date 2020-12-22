const {DataTypes} = require('sequelize');
const db = require('../db');



    const UserBike = db.define('userbike', {
        make: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        color:{ 
            type:DataTypes.STRING,
            allowNull: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tireSize: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userInput: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER
        }

    });
    module.exports = UserBike
    

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
        workers: {
            type: DataTypes.ENUM("mitch", "alex", "david"),
            allowNull: true,
            
        },
        taskColor: {
            type: DataTypes.ENUM("Green", "Yellow", "Red"),
            allowNull: true,
            
        },
        dueDate: {
            type: DataTypes.STRING,
            allowNull: true,
        }
       
    });
    module.exports = UserBike
    

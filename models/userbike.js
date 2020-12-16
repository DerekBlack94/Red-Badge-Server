module.exports = (sequelize, DataTypes) => {
    const UserBike = sequelize.define('userbike', {
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
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER
        }

    });
    return UserBike;
};
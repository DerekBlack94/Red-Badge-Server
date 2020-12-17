module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define('appointments', {
        savedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userInput: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Appointments;
}
const Sequelize = require('sequelize');
const UserBike = database.import('./models/userbike');
const User = database.import('./models/user');
const Appointments = database.import('./models/appointments')

const sequelize = new Sequelize( process.env.DATABASE_URL, {

    
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log('Connected to Red-Badge-Server database');
    },
    (err) => {
        console.log(err);
    }
);

module.exports = sequelize;


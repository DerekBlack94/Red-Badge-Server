require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let db = require('./db');



app.use(require('./middleware/headers'));
// const controllers = require('./controllers')
const userbike = require('./controllers/userbikecontroller');
const user = require('./controllers/usercontroller');
const validateSession = require('./middleware/validate-session');
const appointments = require('./controllers/appointmentcontroller');

sequelize.sync();


app.use(express.json());

app.use('/userbike', userbike);

app.use('/user', user);

app.use('/appointments', appointments)



db.authenticate()
.then(() => db.sync()) // => {force : true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listing on Port ${process.env.PORT}`));

})
.catch((err) =>{
    console.log("[server:] Crashed!");
    console.error(err);
})
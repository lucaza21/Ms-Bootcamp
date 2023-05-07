// DB connection
const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose
    .set('strictQuery', false) // only the fields that are specified in my Schema will be saved in the database
    .connect(`mongodb://${process.env.MONGO_HOST_PORT}/${process.env.MONGO_DB}`)
    .then(() => console.log(`CONECTADO A BBDD ${process.env.MONGO_DB}`))
    .catch(error => console.error(error));
};

module.exports = dbConnection

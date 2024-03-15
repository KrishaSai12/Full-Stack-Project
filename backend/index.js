const app = require('./app');
const dotenv = require('dotenv');
const path = require('path'); // to get the relative path
const connectDatabase = require('./config/database');
const { log, Console } = require('console');


dotenv.config({ path: path.join(__dirname, "config/config.env") }) // it gets current directory and dot env path path.join joins both address

connectDatabase(); // connecting database and calling the database 

const server = app.listen(process.env.PORT, () => {
    console.log(`server listening to the port ${process.env.PORT} running in ${process.env.NODE_ENV}`);
})
// it is used if there is an error in connection string in connecting the mongodb database
process.on('unhandledRejection', (err) => {
    console.log(`Error ${err.message} `);
    console.log('shutting down the server due to error unhandled rejection ');
    server.close(() => {
        process.exit(1);
    });


})
// this error occcurs if any data is not given or if it's not exists it will show
process.on('uncaughtException', (err) => {
    console.log(`Error ${err.message} `);
    console.log('shutting down the server due to error');
    server.close(() => {
        process.exit(1);
    });


})
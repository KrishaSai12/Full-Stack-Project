const mongoose = require('mongoose'); // require the mongoose file 

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{ 
        useNewUrlParser:true , //in mongoose to get the data from the url using new method so it set to true
        useUnifiedTopology: true  // in mongodb driver we get new options in new version to get avoid old options

    }).then(con=>{
        console.log(`MongoDB is connected to host : ${con.connection.host}`)
    })
}

module.exports = connectDatabase;
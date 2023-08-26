const mongoose = require("mongoose");


const connectClient = async () => {

    mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then((data) => {
        console.log(`connected to mongodb with the server : ${data.connection.host}`);
    })
    
};

module.exports = {connectClient };
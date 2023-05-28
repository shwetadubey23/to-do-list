const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "to-do_Project",
    })
        .then(() => {
            console.log("DataBase Connected");
        })
        .catch((err) => {
            console.log(err);
        })

}

module.exports = { connectDb }
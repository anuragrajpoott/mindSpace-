const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {  // <-- add error param here
      console.log("Error connecting to database");
      console.error(error);
      process.exit(1);
    });
};

module.exports = dbConnect;

const mongoose = require("mongoose");
const db_uri = process.env.DB_URI;
const dbConnect = async () => {
    await mongoose
    .connect(db_uri)
    .then(() => {
      console.log("connection to cloud database is successful");
    })
    .catch((error) => {
      console.log("connection failed: " + error);
    });
};

dbConnect()



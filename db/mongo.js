const mongoose = require("mongoose");

async function main() {
  const connect = await mongoose.connect(process.env.MONGO_URL);
  if (connect) {
    console.log(connect.Mongoose);
    console.log("Mongo Db is connected!");
  } else {
    console.log("error");
  }
}

module.exports = main;

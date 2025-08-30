const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});//pehle se kuch data padha h usse completely clesn kr dege
  await Listing.insertMany(initData.data);//sara data delete hone ke baad apna data initiaze kr denge 
  console.log("data was initialized");
};

initDB();

import mongoose from "mongoose";

mongoose
  .connect(`mongodb://localhost:27017/tuvoc_happy`)
  .then(() => {
    console.log("Database Conntected Successfully..");
  })
  .catch((e) => {
    console.log(e);
  });

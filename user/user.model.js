import mongoose from "mongoose";

// set schema
const userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  age: Number,
});

// create collection(model)
const User = mongoose.model("User", userSchema);

export default User;

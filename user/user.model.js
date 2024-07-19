import mongoose from "mongoose";

// set schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
});

// create collection(model)
const User = mongoose.model("User", userSchema);

export default User;

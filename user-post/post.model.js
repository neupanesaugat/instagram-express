import mongoose from "mongoose";

// set schema
const postSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  location: {
    type: String,
    required: false,
    trim: true,
    maxlength: 50,
  },
  image: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

// create model

const Post = mongoose.model("Post", postSchema);

export default Post;

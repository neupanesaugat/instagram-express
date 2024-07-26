import mongoose from "mongoose";

// set schema
const postSchema = mongoose.Schema({
  description: String,
  location: String,
  image: String,
});

// create model

const Post = mongoose.model("Post", postSchema);

export default Post;

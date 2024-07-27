import express from "express";
import connectDB from "./database-connection/connect-db.js";
import userRoutes from "./user/user.controller.js";
import postRoutes from "./user-post/post.controller.js";

const app = express();

// make app understand json
app.use(express.json());

// routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);

// DB connection
await connectDB();

// assign PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

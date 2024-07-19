import express from "express";
import connectDB from "./database-connection/connect-db.js";

const app = express();

// make app understand json
app.use(express.json());

// DB connection
await connectDB();

// assign PORT
const PORT = 8002;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

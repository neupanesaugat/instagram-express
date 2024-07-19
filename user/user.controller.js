import express from "express";
import Yup from "yup";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import { validateUserSchema } from "./user.validation.js";
import validateReqBody from "../middlewares/validation.middleware.js";
import generateHashedPassword from "../utils/password.js";

const router = express.Router();

//? api(s)
//* add user
router.post("/add", validateReqBody(validateUserSchema), async (req, res) => {
  // extract user from req.body
  const newUser = req.body;

  // find user with provided username
  const user = await User.findOne({ username: newUser.username });

  // if user already exist, throw error
  if (user) {
    return res.status(409).send({ message: "User already exist" });
  }

  // generate hashed password
  const plainPassword = newUser.password;
  const saltRound = 10;

  const hashedPassword = await generateHashedPassword(plainPassword, saltRound);
  newUser.password = hashedPassword;

  // add to the db
  await User.create(newUser);

  // send res
  return res.status(200).send({ message: "User added successfully..." });
});

export default router;

import express from "express";
import validateReqBody from "../middlewares/validation.middleware.js";
import generateHashedPassword from "../utils/password.js";
import User from "./user.model.js";
import { validateUserSchema } from "./user.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//? api(s)
//* register user
router.post(
  "/register",
  validateReqBody(validateUserSchema),
  async (req, res) => {
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

    const hashedPassword = await generateHashedPassword(
      plainPassword,
      saltRound
    );
    newUser.password = hashedPassword;

    // add to the db
    await User.create(newUser);

    // send res
    return res.status(200).send({ message: "User added successfully..." });
  }
);

//* login user
router.get("/login", async (req, res) => {
  // extract login credentials from req.body
  const loginCredentials = req.body;

  // find user using the username
  const user = await User.findOne({ username: loginCredentials.username });

  // if not user, throw error
  if (!user) {
    return res.status(404).send({ message: "Invalid credentials!" });
  }

  // check for password match
  const plainPassword = loginCredentials.password;
  const hashedPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  // hide password
  user.password = undefined;

  // if don't match, throw error
  if (!isPasswordMatch) {
    return res.status(404).send({ message: "Invalid Credentials!" });
  }

  // generate access token
  const payload = { username: user.username };
  const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
  const token = jwt.sign(payload, secretKey);

  return res
    .status(200)
    .send({ message: "Success!!", userDetails: user, accessToken: token });
});
export default router;

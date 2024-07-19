import Yup from "yup";

export const validateUserSchema = Yup.object({
  username: Yup.string("Username must be a string")
    .required("Username is required")
    .max(30, "Username cannot be greater than 30 words")
    .lowercase()
    .trim(),
  name: Yup.string("Name should be a string")
    .required("Name is a required field")
    .max(55, "Name cannot be greater than 55 words")
    .trim(),
  password: Yup.string("Password should be a string")
    .required("Password is a required field")
    .trim(),
  age: Yup.number("Age should be a number")
    .required("Age is a required field")
    .min(1, "Age should be greater than 1"),
});

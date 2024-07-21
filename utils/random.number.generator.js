import crypto from "crypto";

const generateRandomString = () => {
  const randomString = crypto.randomBytes(64).toString("hex");
  console.log(randomString);
};

generateRandomString();

import bcrypt from "bcrypt";

const generateHashedPassword = async (plainPassword, saltRound) => {
  return await bcrypt.hash(plainPassword, saltRound);
};

export default generateHashedPassword;

import bcrypt from "bcryptjs";

// Register time -> hash password
export const makeHashed = async (userPassword) => {
  const passwordHashed = await bcrypt.hash(userPassword, 10);
  return passwordHashed;
};

// Login time -> compare user password vs hashed
export const checkEncryptedPassword = async (userPassword, passwordHashed) => {
  const isMatch = await bcrypt.compare(userPassword, passwordHashed);
  return isMatch;
};

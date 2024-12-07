import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// enkripsi password
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

// verify password
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// generate token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// verify token
export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

import dotenv from "dotenv";
dotenv.config();
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secreto123',
  expiresIn: '2h'
};

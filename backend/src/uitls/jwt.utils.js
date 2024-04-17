import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// export function generateToken(user) {
//   return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
// }

// export function decodeToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }

// export function verifyToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//     if (err) {
//       return false;
//     }
//     return decode;
//   });
// }

dotenv.config(); 


export function generateAccessToken(userId, role) {
  // Set the expiration time for the token (e.g., 1 hour)E:\college\fyp\fyp project\backend\src\uitls\jwt.utils.js
  const expiresIn = '1h';
  // Sign the token with the specified payload and secret key
  const token = jwt.sign({userId, role }, process.env.key, { expiresIn });

  return token;
}

export function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyToken(token) {
  const verification = jwt.verify(token, `${process.env.key}`);
  return verification;
}

export function generateRefreshToken(userId,token, role) {
  
  const newToken = jwt.sign({userId,token,role}, `${process.env.key}`);
  return newToken;
} 


import e from "express";
import User from "../model/user.model.js";
import { verifyToken } from "../uitls/jwt.utils.js";

// check authorization
export default async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const verification = verifyToken(token);
    const user = await User.findById(verification.userId);
    req.user = user;


    if (!user) {
      throw new Error("User not found");
    }
    next();
  } catch (e) {
    res.status(401).json({message:e.message || "Auth failed"});
  }
}


// admin role
export function authorizeUser(req, res, next) {
  req.role = req.user.role;
  if (req.role === "user") {
    next();
  } else {
    throw (e)
  }
}

// user role
export function authorizeAdmin(req, res, next) {
  req.role = req.user.role;
  if (req.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

// caheck authorization and role of user
export function authorizeAdminRole() {
  return [authMiddleware, authorizeAdmin];
}

// caheck authorization and role of user
export function authorizeUserRole() {
  return [authMiddleware, authorizeUser];
}

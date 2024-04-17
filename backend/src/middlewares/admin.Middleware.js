import Admin from "../model/admin.model.js";
import { verifyToken } from "../uitls/jwt.utils.js";
import { successHandler, errorHandler } from "../uitls/response.js";


export default async function AdminMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    // console.log(token);
    const verification = verifyToken(token);
    const admin = await Admin.findById(verification.userId);
    req.admin = admin;
  } catch (error) {
    return errorHandler(res, error.message, 500);
  }
}

export function adminRole (req, res, next) {
    if(req.admin.role !== "admin"){
        return errorHandler(res, "You are not authorized to access this route", 403);
    }
    next();
}

export function staffRole (req, res, next) {
    if(req.admin.role !== "staff"){
        return errorHandler(res, "You are not authorized to access this route", 403);
    }
    next();
}

export function superAdminRole (req, res, next) {
    if(req.admin.role !== "superAdmin"){
        return errorHandler(res, "You are not authorized to access this route", 403);
    }
    next();
}

export function isAdmin (req, res, next) {
   return[AdminMiddleware,adminRole]
}

export function isStaff (req, res, next) {
    return[AdminMiddleware,staffRole]
}

export function isSuperAdmin (req, res, next) {
    return[AdminMiddleware,superAdminRole]
}


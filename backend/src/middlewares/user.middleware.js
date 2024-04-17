import User from "../model/user.model.js";
import { verifyToken } from "../uitls/jwt.utils.js";
import { errorHandler, successHandler } from "../uitls/response.js";

export default async function UserMiddleware(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    
    if (!bearerToken) {
      return errorHandler(res, "Token is required", 401);
    }
    
    const decodedValue = verifyToken(bearerToken);
    // return successHandler(res, bearerToken);

    
    if (!decodedValue) {
      return errorHandler(res, "Invalid token", 401);
    }

    const user = await User.findByPk(decodedValue.userId);

    if (!user) {
      return errorHandler(res, "User not found", 404);
    }

    if(user.emailVerified === false){
      return errorHandler(res, "Please verify your email", 401);
    }


    req.user = parseInt(user.id);

    next();
  } catch (e) {
    next(e);
  }
}

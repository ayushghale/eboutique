import User from "../model/user.model.js";
import UserVerification from "../model/userVerification.model.js";
import { verifyToken } from "../uitls/jwt.utils.js";
import { errorHandler, successHandler } from "../uitls/response.js";

export default async function authorizeVerification(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return errorHandler(res, "Token is required", 401);
  }

  const [tokenType, tokenValue] = bearerToken.split(" ");

  const decodedValue = verifyToken(bearerToken);

  const email = decodedValue.userId;
  const role = decodedValue.role;

  if (!email || !role) {
    return errorHandler(res, "Token is required", 401);
  }

  
  const user = await User.findOne({
    where: { email: email },
    attributes: ["id"], // Specify the attributes you want to retrieve
  });
  
  const userVerification = await UserVerification.findOne({
    where: {
      userId: user.id,
      type: role,
      token: bearerToken,
    },
  });
  if (!userVerification) {
    return errorHandler(res, "Unauthorized", 401);
  }
  req.verificationData = userVerification;
  next();
}   

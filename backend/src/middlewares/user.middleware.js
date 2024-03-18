import User from "../model/user.model.js";

export default async function UserMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const verification = verifyToken(token);
    const user = await User.findById(verification.userId);
    req.user = user;
  } catch (error) {
    return errorHandler(res, error.message, 500);
  }
}

import { Router } from 'express';

import UserAuthController from '../../controller/auth/user.controller.js';

const userAuthRouter = Router();

// login user
//api/user/login
userAuthRouter.post("/login",  UserAuthController.login);

// register user
//api/user/register
userAuthRouter.post("/register", UserAuthController.register);

export default userAuthRouter;
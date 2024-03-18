import { json } from "sequelize";
import User from "../../model/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../uitls/jwt.utils.js";
import { successHandler, errorHandler } from "../../uitls/response.js";
import generateUniqueCode from "../../uitls/TCodeGenerate.js";
import { updateRefreshToken } from "../user/user.controller.js";

const UserController = {
  // user login
  async login(req, res) {
    const { email, password } = req.body; // get email and password from request body

    try {
      const user = await User.findOne({ where: { email: email } }); // find user by email

      // if user not found
      if (!user) {
        return errorHandler(res, "User not found", 404);
      }

      // if password is invalid
      if (user.password !== password) {
        return errorHandler(res, "Invalid password", 400);
      }

      // generate random code for refresh token
      const refreshTokenCode = generateUniqueCode();

      // generate access token and refresh token
      const accessToken = generateAccessToken(
        user.id,
        user.email,
        "accessToken"
      );
      // generate refresh token
      const refreshToken = generateRefreshToken(
        user.id,
        refreshTokenCode,
        "refreshToken"
      );

      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        image: user.image,
      };

      //add access token and refresh token to data
      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: userInfo,
      };

      // set cookie options
      const options = {
        httpOnly: true,
        secure: true,
      };

      // update refresh token
      updateRefreshToken(user.id, refreshToken);

      // if update refresh token failed
      if (!updateRefreshToken) {
        return errorHandler(res, "server error", 500);
      }

      // if update refresh token success
      return successHandler(res, data, "User logged in successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  //user register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (user) {
        return errorHandler(res, "User already exists", 400);
      }

      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
      });

      const vToken = generateToken(newUser._id, newUser.email);

      return successHandler(res, { vToken }, "User added successfully", 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  //refresh token
  async refreshToken(req, res) {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return errorHandler(res, "No refresh token", 400);
    }

    try {
      const decoded = refreshToken(refreshToken);

      const accessToken = generateToken(
        decoded.userId,
        decoded.email,
        "accessToken"
      );

      updateRefreshToken(decoded.userId, refreshToken);

      if (!accessToken) {
        return errorHandler(res, "Invalid refresh token", 400);
      }

      return successHandler(res, { accessToken }, "Token refreshed", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  async logout(req, res) {
    try {
      const options = {
        httpOnly: true,
        secure: true,
      };

      return successHandler(
        res
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options),
        "User logged out successfully",
        200
      );
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default UserController;

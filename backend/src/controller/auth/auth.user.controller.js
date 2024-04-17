import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import User from "../../model/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../uitls/jwt.utils.js";
import { successHandler, errorHandler } from "../../uitls/response.js";
import generateUniqueCode from "../../uitls/TCodeGenerate.js";
import { updateRefreshToken } from "../user/user.controller.js";
import UserVerification from "../../model/userVerification.model.js";

import { OtpMail } from "../auth/mail.controller.js";
import { text } from "express";

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
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return errorHandler(res, "Invalid password", 400);
      }

      // generate random code for refresh token
      const refreshTokenCode = generateUniqueCode();

      // generate access token and refresh token
      const accessToken = generateAccessToken(user.id, "accessToken");
      // generate refresh token
      const refreshToken = generateRefreshToken(
        user.id,
        refreshTokenCode,
        "refreshToken"
      );

      const userInfo = user.id

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
  register: async (req, res) => {
    try {
      // return successHandler(res, req.body, 201);

      const { name, address, phoneNumber, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userEmail = await User.findOne({ where: { email: email } });
      const userPhone = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });

      if (userEmail) {
        return errorHandler(res, " Email already exists", 400);
      }
      if (userPhone) {
        return errorHandler(res, " Phone number already exists", 400);
      }

      const newUser = await User.create({
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        password: hashedPassword,
      });

      const emailVerification = await EmailVerification(email);
      // const vToken = generateToken(newUser._id, newUser.email);
      if (emailVerification == null || newUser === null) {
        return errorHandler(res, "User not created", 400);
      }

      return successHandler(
        res,
        { newUser, emailVerification },
        "User added successfully",
        201
      );
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

  reLogin: async (req, res) => {
    const { password } = req.body;
    const userId = req.user;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return errorHandler(res, "User not found", 404);
      }

      if (user.password !== password) {
        return errorHandler(res, "Invalid password", 400);
      }

      const refreshTokenCode = generateUniqueCode();

      const accessToken = generateAccessToken(user.id, "accessToken")

        const refreshToken = generateRefreshToken(user.id, refreshTokenCode, "refreshToken");

      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        image: user.image,
      };

      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: userInfo.id,
      };

      const options = {
        httpOnly: true,
        secure: true,
      };

      updateRefreshToken(user.id, refreshToken);

      if (!updateRefreshToken) {
        return errorHandler(res, "server error", 500);
      }

      return successHandler(res, data, "User logged in successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },



  emailVerification: async (req, res, email) => {
    try {
      const userData = await User.findOne({
        where: { email: email },
        attributes: ["id"], // Specify the attributes you want to retrieve
      });

      if (!userData) {
        return errorHandler(res, "User not found", 404);
      }

      const jwtToken = generateRefreshToken(
        email,
        generateUniqueCode(),
        "Email Verification"
      );

      const otpCode = generateOTPCode();

      const subject = "Email Verification";
      const mail = new OtpMail(email, subject, otpCode);

      if (mail) {
        const userVerificationData = await UserVerification.findOne({
          where: { userId: userData.id, type: "Email Verification" },
        });

        if (userVerificationData) {
          const update = await UserVerification.update(
            { otpCode: otpCode, token: jwtToken },
            { where: { userId: userData.id, type: "Email Verification" } }
          );
        } else {
          const userVerification = await UserVerification.create({
            userId: userData.id,
            type: "Email Verification",
            otpCode: otpCode,
            token: jwtToken,
          });
        }
        return jwtToken;
      } else {
        return errorHandler(res, "Email not sent", 500);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const userData = await User.findOne({
        where: { email: email },
        attributes: ["id"], // Specify the attributes you want to retrieve
      });

      if (!userData) {
        return errorHandler(res, "User not found", 404);
      }

      const jwtToken = generateRefreshToken(
        email,
        generateUniqueCode(), // Ensure generateUniqueCode() generates truly unique values
        "Forget Password"
      ); // Generate a JWT token for email verification
      const otpCode = generateOTPCode(); // Generate a 4-digit OTP code
      const subject = "Forget Password"; // Email subject
      const mail = new OtpMail(email, subject, otpCode);

      if (mail) {
        const userVerificationData = await UserVerification.findOne({
          where: { userId: userData.id, type: "Forget Password" },
        });

        // return successHandler(res, userVerificationData, "userVerificationData Email sent", 200);

        try {
          if (userVerificationData) {
            const updateVerification = await UserVerification.update(
              { otpCode: otpCode, token: jwtToken },
              { where: { userId: userData.id, type: "Forget Password" } }
            );
            return successHandler(
              res,
              { jwtToken },
              " updateVerification Email sent",
              200
            );
          } else {
            const newVerification = await UserVerification.create({
              userId: userData.id,
              type: "Forget Password",
              otpCode: otpCode,
              token: jwtToken,
            });

            return successHandler(
              res,
              { jwtToken },
              " newVerification Email sent",
              200
            );
          }
          return successHandler(res, { jwtToken }, "Email sent", 200);
        } catch (error) {
          return errorHandler(res, error.message, 500);
        }
      } else {
        return errorHandler(res, "Email not sent", 500);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  otpVerification: async (req, res) => {
    const verificationData = req.verificationData;

    const { otpCode } = req.body;

    // return successHandler(res, { newotpCode, dataCheck,verificationData }, "OTP verified successfully", 200);

    try {
      if (verificationData.otpCode == otpCode) {
        if (verificationData.type === "Forget Password") {
          const type = "New Password";
          
            
          const UserEmail = await User.findOne({
            where: { id: verificationData.userId },
            attributes: ["email"],
          });

          const jwtToken = generateRefreshToken(
            UserEmail.email,
            generateUniqueCode(),
            type
          );

          const verification = await UserVerification.findOne({
            where: { userId: verificationData.userId, type: type },
          });

          if (verification) {
            const updateVerification = await UserVerification.update(
              { token: jwtToken },
              { where: { userId: verificationData.userId, type: type } }
            );
          } else {
            const newToken = await UserVerification.create({
              userId: verificationData.userId,
              type: type,
              otpCode: verificationData.otpCode,
              token: jwtToken,
            });
          }
          await UserVerification.destroy({
            where: { userId: verificationData.userId, type: "Forget Password" },
          });
          return successHandler(
            res,
            { type: "forgetpassword", newURl: jwtToken },
            "OTP verified successfully",
            200
          );
        } else if (verificationData.type === "Email Verification") {
          await User.update(
            { emailVerified: true },
            { where: { id: verificationData.userId } }
          );

          await UserVerification.destroy({
            where: {
              userId: verificationData.userId,
              type: "Email Verification",
            },
          });

          return successHandler(res, "Email verified successfully", 200);
        }
      } else {
        return errorHandler(res, "Invalid OTP", 400);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  resetPassword: async (req, res) => {
    const { password } = req.body;
    const verificationData = req.verificationData;



    try {
      await User.update(
        { password },
        { where: { id: verificationData.userId } }
      );

      await UserVerification.destroy({
        where: { userId: verificationData.userId, type: "New Password" },
      });

      return successHandler(res, "Password changed successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default UserController;

// 4 digit otp code
function generateOTPCode() {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code;
}

export async function EmailVerification(email) {
  try {
    const userData = await User.findOne({
      where: { email: email },
      attributes: ["id"], // Specify the attributes you want to retrieve
    });

    if (!userData) {
      return errorHandler(res, "User not found", 404);
    }

    const jwtToken = generateRefreshToken(
      email,
      generateUniqueCode(),
      "Email Verification"
    );

    const otpCode = generateOTPCode();

    const subject = "Email Verification";
    const mail = new OtpMail(email, subject, otpCode);

    if (mail) {
      const userVerificationData = await UserVerification.findOne({
        where: { userId: userData.id, type: "Email Verification" },
      });

      if (userVerificationData) {
        const update = await UserVerification.update(
          { otpCode: otpCode, token: jwtToken },
          { where: { userId: userData.id, type: "Email Verification" } }
        );
      } else {
        const userVerification = await UserVerification.create({
          userId: userData.id,
          type: "Email Verification",
          otpCode: otpCode,
          token: jwtToken,
        });
      }
      return jwtToken;
    } else {
      return errorHandler(res, "Email not sent", 500);
    }
  } catch (error) {
    return errorHandler(res, error.message, 500);
  }
}

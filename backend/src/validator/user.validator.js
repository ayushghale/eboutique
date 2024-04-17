import { body, param } from "express-validator";

export const postUserLoginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Email should be in the correct format"),

    body("password")
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 5, max: 100 })
      .withMessage("Password must be between 5 to 100 characters"),
  ];
};

export const postUserRegisterValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 to 100 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Email should be in correct format"),

    body("address")
      .notEmpty()
      .withMessage("Address can not be empty"),

    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number can not be empty")
      .isLength({ min: 10, max: 11 })
      .withMessage("Invalid phone number"),

    body("password")
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 5, max: 100 })
      .withMessage("Password must be between 5 to 100 characters"),

    
  ];
}

export const getUserIdParam = () => {
  return [
    param("id")
      .notEmpty() 
      .withMessage("Password can not be empty")
      .isMongoId()
      .withMessage("Id should be valid"),
  ];
};

export const CredentialValidation = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 5, max: 100 })
      .withMessage("Password must be between 5 to 100 characters"),
  ];
};

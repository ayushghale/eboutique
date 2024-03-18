import { body, param } from "express-validator";

export const postDesignValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 to 100 characters"),
    body("description")
      .notEmpty()
      .withMessage("Description can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Description must be between 2 to 100 characters"),
  ];
};

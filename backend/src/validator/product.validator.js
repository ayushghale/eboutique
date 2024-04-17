import { body, param } from "express-validator";

export const postCartValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 to 100 characters"),
      
    body("price").notEmpty().withMessage("Price can not be empty"),

    body("description").notEmpty().withMessage("Description can not be empty"),

    body("categoryId").notEmpty().withMessage("Category Id can not be empty"),
  ];
};

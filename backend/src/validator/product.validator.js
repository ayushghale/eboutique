import { body, param } from "express-validator";

export const postCartValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 to 100 characters"),
      
    body("price").notEmpty().withMessage("Price can not be empty"),

    body("image")
      .notEmpty()
      .withMessage("Image can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("Image must be between 2 to 100 characters")
      .custom((value, { req }) => {
        if (!value.match(/\.(jpg|jpeg|png)$/i)) {
          throw new Error("Only JPG, JPEG, or PNG images are allowed");
        }
        return true; // Validation succeeded
      }),
    body("description").notEmpty().withMessage("Description can not be empty"),

    body("categoryId").notEmpty().withMessage("Category Id can not be empty"),
  ];
};

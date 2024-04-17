import { body, param } from "express-validator";

export const postCartValidation = () => {
  const validations = [];

  if (
    !body("customDesignId")
      .notEmpty()
        .withMessage("customDesignId can not be empty")
  ) {
    body("productId")
      .notEmpty()
      .withMessage("productId can not be empty")
  } else {
    body("customDesignId")
      .notEmpty()
      .withMessage("customDesignId can not be empty")
      .isLength({ min: 2, max: 100 })
      .withMessage("customDesignId must be between 2 to 100 characters");
  }

  body("quantity")
    .notEmpty()
    .withMessage("quantity can not be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("quantity must be between 2 to 100 characters");

  return validations;
};
 
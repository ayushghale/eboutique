import { body, param } from "express-validator";


export const LocationFormValidator =()=> {
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

        body("phoneNumber")
            .notEmpty()
            .withMessage("Phone number can not be empty")
            .isLength({ min: 10, max: 15 })
            .withMessage("Phone number must be between 10 to 15 characters"),

        body("address")
            .notEmpty()
            .withMessage("Address can not be empty")
            .isLength({ min: 2, max: 100 })
            .withMessage("Address must be between 2 to 100 characters"),

        body("city")
            .notEmpty()
            .withMessage("City can not be empty")
            .isLength({ min: 2, max: 50 })
            .withMessage("City must be between 2 to 50 characters"),
        body("country")
            .notEmpty()
            .withMessage("Country can not be empty")
            .isLength({ min: 2, max: 50 })
            .withMessage("Country must be between 2 to 50 characters"),
    ]
}

export const updateLocationValidator =()=> {
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
    ],
    [
        param("id")
            .notEmpty()
            .withMessage("Id can not be empty")
            .isInt()
            .withMessage("Id should be valid")
    ]
}


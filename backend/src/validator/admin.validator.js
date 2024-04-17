import { body, param } from "express-validator";


export const addNewAdminValidator =()=> {
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

        body("password")
            .notEmpty()
            .withMessage("Password can not be empty")
            .isLength({ min: 5, max: 100 })
            .withMessage("Password must be between 5 to 100 characters"),
    ]
}

export const updateAdminValidator =()=> {
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

export const loginAdminValidator =()=> {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email can not be empty")
            .isEmail()
            .withMessage("Email should be in correct format"),

        body("password")
            .notEmpty()
            .withMessage("Password can not be empty")
            .isLength({ min: 5, max: 100 })
            .withMessage("Password must be between 5 to 100 characters"),
    ]
}
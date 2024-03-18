import { query } from "express-validator";

export default function paginationValidation() {
  return [
    query("page").isInt({ min: 1 }).withMessage("page should be integer"),
    query("limit").isInt({ min: 1 }).withMessage("limit should be integer"),
  ];
}

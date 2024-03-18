import { validationResult } from "express-validator";

export default function validatorResult(req, res, next) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const formattedresult = result.array().map((error) => {
      return {
        [error.path]: error.msg,
      };
    });

    return res.status(400).json({ result: formattedresult });
  }

  next();
}

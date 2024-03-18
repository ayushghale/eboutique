// for error response
export function errorHandler(res, message, status) {
  return res.status(status).send({
    success: false,
    message,
    status,
  });
}

// for success response
export function successHandler(
  res,
  data = {},
  message = "success",
  status = 200
) {
  return res.status(status).send({
    success: true,
    message,
    data,
  });
}

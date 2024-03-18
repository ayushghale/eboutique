import http from "../index";

export default function postLoginApi(data) {
  const response = http.post("/login", data);
  return response;
}

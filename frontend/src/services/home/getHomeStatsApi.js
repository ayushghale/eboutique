import http from "..";

const getHomeStatsApi = () => {
  const response = http.get("/");
  return response;
};

export default getHomeStatsApi;

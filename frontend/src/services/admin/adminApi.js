import axios from "axios";

const localApi = "http://localhost:3000/api";

export const adminApi = {
  async get(url) {
    const response = await fetch(`${localApi}/${url}`,{
        headers: {
            "authorization" : `${sessionStorage.getItem("accessToken")}` ,
            "refreshToken" : `${sessionStorage.getItem("refreshToken")}`
        }
    })

    const data = await response.json();

    return data;
  },

  async post(url, body) {
    const accessToken = sessionStorage.getItem("accessToken");

    // if(!accessToken){
    //   return {message: "Unauthorized"}
    // }
    
    const response = await axios.post(`${localApi}/${url}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": accessToken,
      },
    });
    return response.data;
  },
  
  async put(url, body) {
    const response = await fetch(`${localApi}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },

  async delete(url) {
    const response = await fetch(`${localApi}/${url}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  },

  async login(url, body) {
    const response = await axios.post(`${localApi}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  async register(url, body) {
    const response = await axios.post(`${localApi}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  async verifyEmail(url, body) {
    const response = await axios.post(`${localApi}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  async verifyToken(url,token, body) {
    const response = await axios.post(`${localApi}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
        "authorization": token,
      },
    });
    return response.data;
  },
};

export default adminApi;
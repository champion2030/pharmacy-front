import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (userName, email, password) => {
  return axios.post(API_URL + "signup", {
    userName,
    email,
    password,
  });
};

const login = (userName, password) => {
  return axios
    .post(API_URL + "signin", {
      userName,
      password,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

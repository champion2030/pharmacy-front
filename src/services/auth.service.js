import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const Authentication = {
    register,
    login,
    logout,
}

export default Authentication

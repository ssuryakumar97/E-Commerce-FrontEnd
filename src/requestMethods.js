import axios from "axios";

// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = "https://e-commerce-backend-jfeh.onrender.com/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});


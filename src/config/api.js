import axios from "axios";

export const API = axios.create({
    // baseURL: "http://localhost:5000/waysbucks/",
    baseURL: "https://be-waysbucks-production.up.railway.app/waysbucks",
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};
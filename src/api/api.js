import axios from "axios";

const api = axios.create({
    baseURL: "https://68a86bc3bb882f2aa6de805f.mockapi.io/ap/v1/",
    timeout: 5000,
});

export default api;
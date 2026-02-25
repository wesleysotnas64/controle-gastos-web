import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:44346',
});

export default api;
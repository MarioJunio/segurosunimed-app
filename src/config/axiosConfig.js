import axios from 'axios';

require("dotenv").config();

const instance = axios.create();

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Basic ${process.env.REACT_APP_AUTH_TOKEN}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

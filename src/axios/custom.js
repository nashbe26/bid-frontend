import axios from "axios";

const { REACT_APP_API_BACK } = process.env;

const customAxios = axios.create({
  baseURL: "https://urakkahuuto.fi/",
});


customAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customAxios;

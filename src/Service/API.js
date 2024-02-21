import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "https://api.realworld.io/api";
axios.interceptors.request.use((config) => {
  const token = getItem("token");
  const auth = token ? `Token ${token}` : "";
  config.headers.Authorization = auth;
  return config;
});

export default axios;

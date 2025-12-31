import axios from "axios";

const Instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL_URL}/api`,
  withCredentials: true,
});

export default Instance;

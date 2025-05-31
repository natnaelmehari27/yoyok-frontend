import axios from "axios";

axios.defaults.baseURL = "https://drf-api-rec.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "Multipart/form-data";
axios.defaults.withCredentials = true; 
import axios from "axios";
import { API_URL } from "./apiEndPoint";

const myAxios = axios.create({
    baseURL:API_URL,
    headers:{
        Accept: "application/json",
    },
});

export default myAxios;
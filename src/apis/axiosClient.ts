import axios from "axios";
import { URL } from "../constants/common";

const axiosClient = axios.create({
    baseURL: URL,
});

export default axiosClient
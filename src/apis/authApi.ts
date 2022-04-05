import { AuthForm } from "../models/common";
import axiosClient from "./axiosClient";

const authApi = {
    login(params: AuthForm) {
        const url = '/auth/login';
        return axiosClient.post(url , params)
    }
}
export default authApi
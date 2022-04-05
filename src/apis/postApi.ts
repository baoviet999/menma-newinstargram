import { DataPostResponse } from '../models/common';
import axiosClient from "./axiosClient";

const postApi = {
    getPost(): Promise<DataPostResponse> {
        const url = '/posts';
        return axiosClient.get(url);
    },
};

export default postApi
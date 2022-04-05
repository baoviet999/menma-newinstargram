import axios from 'axios';

const setHeader = (token: string | undefined) => {
    token
        ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
        : delete axios.defaults.headers.common['Authorization'];
};

export default setHeader;

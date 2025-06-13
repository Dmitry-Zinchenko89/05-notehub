import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const axiosInstance = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
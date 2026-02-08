import axios from 'axios';


const API_BASE_URL = import.meta.env.APP_API_BASE_URL + '/users';

export const users = {
    async getAll() {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    },

    async getById(id: string) {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    async create(userData: Record<string, any>) {
        const response = await axios.post(`${API_BASE_URL}`, userData);
        return response.data;
    },

    async update(id: string, userData: Record<string, any>) {
        const response = await axios.put(`${API_BASE_URL}/${id}`, userData);
        return response.data;
    },

    async delete(id: string) {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    }
};
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://taskmanager-backend-pz09.onrender.com/api/v1',
    withCredentials: true
})

export default api
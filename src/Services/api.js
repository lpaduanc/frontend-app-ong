import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', //baseURL � um par�metro do axios, deve ser escrito assim
});

export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', //baseURL é um parâmetro do axios, deve ser escrito assim
});

export default api;
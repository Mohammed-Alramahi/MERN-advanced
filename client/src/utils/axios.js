import axios from 'axios';
//export let url = 'http://localhost:8099';
export let url = 'http://localhost:5000/api';
const Axios = axios.create({
    baseURL: url,
});

export default Axios;
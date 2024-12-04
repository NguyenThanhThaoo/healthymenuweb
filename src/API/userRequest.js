import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

export const updateUser = (data) => API.put('/changeUsername',  data , {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})
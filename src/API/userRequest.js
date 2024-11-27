import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

export const getProfilePersonal = (nickname) => API.get('/api/users/getUse/' + nickname + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const getProfileUser = () => API.get('/api/users/persional-profile', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const updateUser = (nickname, data) => API.put('changeUsername' + nickname + '', { data }, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const updateImage = (nickname, data) => API.put('/api/users/' + nickname + '/upload', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
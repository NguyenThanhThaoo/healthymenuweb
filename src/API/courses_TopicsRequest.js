// import axios from "axios";
// ;

// const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

// //topics
// export const getAllTopics = () => API.get('/api/topic/allTopics', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// export const getAllTopicsRegisted = () => API.get('/api/topic/OwnTopics/registered', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// export const registedTopic = (id) => API.post('/api/topic/' + id + '/resgister', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// //course
// export const getListCourse = (slug) => API.get('/api/course/' + slug + '', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })

// export const getTrackListCourse = (slug) => API.get('/api/course/' + slug + '/tracklist', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })

// export const getDetailCourse = (id) => API.get('/api/course/' + id + '/detail', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// export const getNextCourse = (id) => API.get('/api/course/nextCourse/' + id + '', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// export const getPreviousCourse = (id) => API.get('/api/course/previousCourse/' + id + '', {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })
// export const finishCourse = (id, data) => API.put('/api/course/' + id + '/finished', data, {
//     headers: {
//         'token': localStorage.getItem('token')
//     }
// })

// //search
// export const searchT_C_Blog = (debounce) => API.get(`/api/course/search`, {
//     params: {
//         q: debounce,
//     }
// })

import axios from "axios"


const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

//Topics admin
export const getAllDishesAdmin = async ({ page = 1, limit = 12 }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await API.get('/dishes', {
            headers: {
                'Authorization': token,
            },
            params: { 
                page, 
                limit 
            }
        });

        return response; // Success, return the data for processing
    } catch (error) {
        console.error('Error fetching dishes:', error.message || error);
        throw error; // Re-throw to handle in the calling component
    }
};
export const getDetailDishAdmin = (id) => API.get('/getFood/' + id + '', {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})

export const addDishAdmin = (data) => API.post('/createFood', data, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})

export const editDishAdmin = (id, data) => API.put('/editFood/' + id,data, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }, 
})
export const deleteDishAdmin = (id) => API.delete('/deleteFood/' + id , {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})

//course
export const getListCourseAdmin = (slug) => API.get('/api/admin/allCourse/' + slug + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const getDetailCourseAdmin = (id) => API.get('/api/admin/courseDetail/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const addCourseAdmin = (slug, data) => API.put('/api/admin/addcourse/' + slug + '', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const editCourseAdmin = (id, data) => API.put('/api/admin/edit/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
export const deleteCourseAdmin = (id) => API.delete('/api/admin/deletecourse/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

//user
export const getAllUsers = () => API.get('/api/users', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const getDetailUser = (id) => API.get('/api/users/' + id + '/edit', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const editUser = (id, data) => API.put('/api/users/' + id + '/update', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
export const deleteUser = (id) => API.delete('/api/users/' + id + '/delete', {
    headers: {
        'token': localStorage.getItem('token')
    }
}
)

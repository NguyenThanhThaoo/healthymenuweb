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

//user
export const getAllUsers = ({ page = 1, limit = 12 }) => API.get('/users', {
    headers: {
        'Authorization': localStorage.getItem('token'),
        params: { 
            page, 
            limit 
        }
    }
})
export const getDetailUser = (id) => API.get('/user_detail/' + id, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})

export const editUser = (id, data) => API.put('/edit_user/' + id,data, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})
export const deleteUser = (id) => API.delete('/delete_user/' + id , {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
}
)

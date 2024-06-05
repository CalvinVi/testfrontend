import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Backend-URL

export const fetchTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const addTodo = async (todo) => {
    try {
        const response = await axios.post(`${API_URL}/todos`, todo);
        return response.data;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

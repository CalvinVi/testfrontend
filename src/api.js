const API_URL = 'https://test-skav.onrender.com';

export const fetchTodos = async () => {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
            throw new Error('Error fetching todos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const addTodo = async (todo) => {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        if (!response.ok) {
            throw new Error('Error adding todo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error deleting todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
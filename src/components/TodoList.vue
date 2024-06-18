<template>
    <div>
      <h1>Todo List</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
      </ul>
      
      
    </div>
  </template>
  
  <script>
  import { fetchTodos, addTodo } from '../api';
  
  export default {
    data() {
      return {
        todos: []
      };
    },
    async created() {
      try {
        this.todos = await fetchTodos();
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    methods: {
      async handleAddTodo(todo) {
        try {
          const newTodo = await addTodo(todo);
          this.todos.push(newTodo);
        } catch (error) {
          console.error('Failed to add todo:', error);
        }
      }
    }
  };
  </script>  
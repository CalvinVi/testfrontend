<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { fetchTodos, addTodo, deleteTodo } from '@/api'; // Der Importpfad bleibt gleich

const todos = ref<any[]>([]);
const name = ref<string>('');
const input_content = ref<string>('');
const input_category = ref<string | null>(null);

const todos_asc = computed(() => {
    return [...todos.value].sort((a, b) => a.createdAt - b.createdAt);
});

watch(name, (newVal: string) => {
    localStorage.setItem('name', newVal);
});

watch(todos, (newVal: any[]) => {
    localStorage.setItem('todos', JSON.stringify(newVal));
}, {
    deep: true
});

const addTodoItem = async () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
        return;
    }

  const newTodo = {
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  };

  try {
    const addedTodo = await addTodo(newTodo);
    todos.value.push(addedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const removeTodo = async (todo: any) => {
    try {
        await deleteTodo(todo.id);
        todos.value = todos.value.filter((t) => t !== todo);
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};

onMounted(async () => {
    name.value = localStorage.getItem('name') || '';
    const todosFromStorage = localStorage.getItem('todos');
    todos.value = todosFromStorage ? JSON.parse(todosFromStorage) : [];

    try {
        const fetchedTodos = await fetchTodos();
        todos.value = fetchedTodos;
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
});
</script>

<template>
<main class="app">
    <section class="greeting">
        <h2 class="title">
            Hallo, <input type="text" id="name" placeholder="Name eingeben" v-model="name">
        </h2>
    </section>

    <section class="create-todo">
        <h3>Erstelle eine Erinnerung!</h3>
        <form id="new-todo-form" @submit.prevent="addTodoItem">
            <h4>Was soll auf die Erinnerungsliste?</h4>
            <input 
                type="text" 
                name="content" 
                id="content" 
                placeholder="Gib hier dein Eintrag ein..."
                v-model="input_content" />
            
            <h4>Wähle eine Kategorie</h4>
            <div class="options">
                <label>
                    <input 
                        type="radio" 
                        name="category" 
                        id="category1" 
                        value="business"
                        v-model="input_category" />
                    <span class="bubble business"></span>
                    <div>beruflich</div>
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="category" 
                        id="category2" 
                        value="personal"
                        v-model="input_category" />
                    <span class="bubble personal"></span>
                    <div>persönlich</div>
                </label>
            </div>
            <input type="submit" value="Hinzufügen" />
        </form>
    </section>

    <section class="todo-list">
        <h3>ERINNERUNGSLISTE</h3>
        <div class="list" id="todo-list">
          <div v-for="todo in todos_asc" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${
                        todo.category == 'business' 
                            ? 'business' 
                            : 'personal'
                    }`"></span>
                </label>
                <div class="todo-content">
                    <input type="text" v-model="todo.content" />
                </div>
                <div class="actions">
                    <button class="delete" @click="removeTodo(todo)">Löschen</button>
                </div>
            </div>
        </div>
    </section>
</main>
</template>
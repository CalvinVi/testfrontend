<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref<any[]>([])
const name = ref<string>('')

const input_content = ref<string>('')
const input_category = ref<string | null>(null)

const todos_asc = computed(() => todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt
}))

watch(name, (newVal: string) => {
    localStorage.setItem('name', newVal)
})

onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
<main class="app">
    
    <section class="greeting">
        <h2 class="title">
            Hallo, <input type="text" id="name" placeholder="Name here" v-model="name">
        </h2>
    </section>

</main>
</template>

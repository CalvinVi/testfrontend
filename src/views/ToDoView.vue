<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

/**
 * Ref-Variablen für die Todos, den Namen des Benutzers, den Eingabetext und die Eingabekategorie
 */
const todos = ref<any[]>([])
const name = ref<string>('')
const input_content = ref<string>('')
const input_category = ref<string | null>(null)

/**
 * Berechnete Variable für die sortierten Todos
 */
const todos_asc = computed(() => todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt // Sortierung nach Erstellungszeitpunkt
}))

/**
 * Beobachtung der Änderungen am Benutzernamen und Speicherung im Local Storage
 */
watch(name, (newVal: string) => {
    localStorage.setItem('name', newVal) // Speichern des Namens im Local Storage
})

/**
 * Beobachtung der Änderungen an den Todos und Speicherung im Local Storage
 */
watch(todos, (newVal: any[]) => {
    localStorage.setItem('todos', JSON.stringify(newVal)) // Speichern der Todos im Local Storage
}, {
    deep: true // Tiefenüberwachung für Verschachtelung in Objekten
})

/**
 * Funktion zum Hinzufügen eines neuen Todo-Eintrags
 */
const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
        return // Abbrechen, wenn der Eingabetext leer ist oder keine Kategorie ausgewählt wurde
    }

    // Hinzufügen des neuen Todo-Eintrags
    todos.value.push({
        content: input_content.value, // Todo-Text
        category: input_category.value, // Kategorie
        done: false, // Flag für Erledigung
        editable: false, // Flag für Bearbeitbarkeit
        createdAt: new Date().getTime() // Erstellungszeitpunkt
    })
}

/**
 * Funktion zum Entfernen eines Todo-Eintrags
 * @param todo Der Todo-Eintrag, der entfernt werden soll
 */
const removeTodo = (todo: any) => {
    todos.value = todos.value.filter((t) => t !== todo) // Filtern des Todo-Eintrags aus der Liste
}

/**
 * Hook, der beim Laden der Komponente ausgeführt wird, um den Benutzernamen und die Todos aus dem Local Storage zu laden
 */
onMounted(() => {
    name.value = localStorage.getItem('name') || '' // Laden des Namens aus dem Local Storage oder leeres String, wenn nicht vorhanden
    todos.value = JSON.parse(localStorage.getItem('todos')) || [] // Laden der Todos aus dem Local Storage oder leeres Array, wenn nicht vorhanden
})
</script>

<template>
<main class="app">
    
    <!-- Bereich für die Begrüßungsnachricht mit Eingabefeld für den Benutzernamen -->
    <section class="greeting">
        <h2 class="title">
            Hallo, <input type="text" id="name" placeholder="Name eingeben" v-model="name">
        </h2>
    </section>

    <!-- Bereich zum Erstellen eines neuen Todo-Eintrags -->
    <section class="create-todo">
        <h3>Erstelle eine Erinnerung!</h3>

        <!-- Formular zum Hinzufügen eines neuen Todo-Eintrags -->
        <form id="new-todo-form" @submit.prevent="addTodo">
            <h4>Was soll auf die Erinnerungsliste?</h4>
            <!-- Eingabefeld für den Todo-Text -->
            <input 
                type="text" 
                name="content" 
                id="content" 
                placeholder="Gib hier dein Eintrag ein..."
                v-model="input_content" />
            
            <h4>Wähle eine Kategorie</h4>
            <!-- Auswahlmöglichkeiten für die Kategorie -->
            <div class="options">

                <label>
                    <!-- Auswahl für die Kategorie "beruflich" -->
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
                    <!-- Auswahl für die Kategorie "persönlich" -->
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

            <!-- Schaltfläche zum Hinzufügen des Todo-Eintrags -->
            <input type="submit" value="Hinzufügen" />
        </form>
    </section>

    <!-- Bereich zur Anzeige der Todo-Liste -->
    <section class="todo-list">
        <h3>ERINNERUNGSLISTE</h3>
        <div class="list" id="todo-list">

            <!-- Iteration über die sortierten Todos und Anzeige in der Liste -->
            <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
                <label>
                    <!-- Checkbox für die Erledigung des Todo-Eintrags -->
                    <input type="checkbox" v-model="todo.done" />
                    <!-- Markierung für die Kategorie des Todo-Eintrags -->
                    <span :class="`bubble ${
                        todo.category == 'business' 
                            ? 'business' 
                            : 'personal'
                    }`"></span>
                </label>

                <!-- Eingabefeld für den Todo-Text -->
                <div class="todo-content">
                    <input type="text" v-model="todo.content" />
                </div>

                <!-- Aktionen für den Todo-Eintrag (z.B. Löschen) -->
                <div class="actions">
                    <button class="delete" @click="removeTodo(todo)">Löschen</button>
                </div>
            </div>

        </div>
    </section>

</main>
</template>

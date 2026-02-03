<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import TaskList from '@/components/TaskList.vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    import ErrorView from '@/components/ErrorView.vue';
    import LoadingView from '@/components/LoadingView.vue';

    const store = useTaskStore();
    const taskTitle = ref("");

    onMounted(() => {
        store.getAll();
    });

    const tasks = computed(() => store.state.tasks);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);

    const add = async () => {
        if (taskTitle.value.trim().length === 0) return;
        await store.addTask({ 
            title: taskTitle.value, 
            completion: false,
            date: new Date().toDateString()
        });
        taskTitle.value = "";
    }
</script>

<template>
    <div id="add-form">
        <input 
            type="text" 
            id="title" 
            name="title" 
            v-model="taskTitle"
            placeholder="What needs to be done?"
            @keyup.enter="add" 
        >
        
        <button class="btn-primary" @click="add">ADD TASK</button>

        <button id="btn-undo" class="btn-secondary" @click="store.undo" title="Undo Last Action">
            &#8630;
        </button>
        <!-- <button id="btn-redo" class="btn-secondary" @click="store.undo" title="Redo Last Action">
            &#8631;
        </button> -->
    </div>

    <div id="task-list">
        <ErrorView v-if="error" />
        <LoadingView v-else-if="isLoading" />
        <TaskList v-else-if="tasks && tasks.length > 0" :arr="tasks" />
        
        <div v-else class="empty-state">
            <p>No tasks yet. Add one above!</p>
        </div>
    </div>
</template>

<style scoped>
    #add-form {
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 2rem;
        font-weight: 300;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    input[type="text"] {
        font-size: 1.5rem;
        padding: 0.5rem;
        flex-grow: 1;   
        max-width: 600px;
        
        background: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 4px;
    }
    
    input[type="text"]:focus {
        outline: 2px solid var(--vt-c-indigo);
    }

    button {
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        white-space: nowrap;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .btn-primary {
        background-color: var(--vt-c-indigo);
        color: white; 
        border: 1px solid var(--vt-c-indigo);
    }

    .btn-secondary {
        padding: 0.5rem;
        font-size: 1.5rem;
        background-color: transparent;
        color: var(--color-text);
        border: 1px solid var(--color-border);
    }

    .btn-primary:hover {
        opacity: 0.9;
    }

    .btn-secondary:hover {
        background-color: var(--color-background-soft);
        border-color: var(--color-border-hover);
    }

    #task-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    #task-list > * {
        width: 100%;
        max-width: 800px; 
    }

    .empty-state {
        color: var(--color-text);
        opacity: 0.6;
        font-size: 1.5rem;
        margin-top: 2rem;
        text-align: center;
    }

    @media (max-width: 600px) {
        #add-form {
            flex-direction: row;
            flex-wrap: wrap; 
            align-items: stretch;
            gap: 1rem;
        }

        input[type="text"] {
            order: 1;
            width: 100%;
            max-width: 100%;
        }

        .btn-primary {
            order: 2;
            flex-grow: 3;
            /* min-width: 100%; */
        }

        #btn-undo {
            order: 3;
            flex-grow: 1; 
            min-width: 60px; 
        }

        #btn-redo {
            order: 4;
            flex-grow: 1; 
            min-width: 60px; 
        }
        
        button {
            padding: 1rem;
        }
    }
</style>
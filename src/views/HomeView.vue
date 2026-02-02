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
        <!-- <label for="title">Title:</label> -->
        
        <input 
            type="text" 
            id="title" 
            name="title" 
            v-model="taskTitle"
            placeholder="What needs to be done?"
            @keyup.enter="add" 
        >
        
        <button @click="add">ADD TASK</button>
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
        gap: 2rem;
        margin-bottom: 2rem;
    }

    input[type="text"] {
        font-size: 1.5rem;
        padding: 0.5rem;
        flex-grow: 1;   
        max-width: 600px;
    }

    button {
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        white-space: nowrap;
    }

    #task-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #task-list > * {
        width: 100%;
        max-width: 800px; 
    }

    .empty-state {
        color: #888;
        font-size: 1.5rem;
        margin-top: 2rem;
    }

    @media (max-width: 600px) {
        #add-form > * {
            font-size: 1.5rem;
        }

        #add-form {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        input[type="text"] {
            max-width: 100%;
        }

        button {
            width: 100%;
            padding: 1rem;
        }
    }
</style>
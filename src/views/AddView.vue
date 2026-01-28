<script setup lang="ts">
    import TaskList from '@/components/TaskList.vue';
    import { ref } from 'vue';
    import { useTaskStore } from '@/stores/tasks';
    const store = useTaskStore();
    let arr = store.taskData;

    let taskTitle = ref("");
    const add = () => {
        store.addTask({ id: arr.length+1, title: taskTitle.value, completion: false, date: new Date().toISOString() })
    }
</script>

<template>
    <div id="add-form">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" v-model="taskTitle">
        <button v-on:click="add">ADD TASK</button>
    </div>
    <div id="task-list">
        <TaskList :arr="arr" />
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
        gap: 2rem;
    }

    input {
        width: 50%;
        height: 25px;
    }

    button {
        height: 30px;
    }
</style>
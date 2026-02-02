<script setup lang="ts">
    import type { Task } from '@/interfaces/Task';
    import { useRoute, useRouter } from 'vue-router';
    import { useTaskStore } from '@/stores/tasks/tasks';
    const store = useTaskStore();

    const router = useRouter()

    let props = defineProps<{ item: Task }>()
    let editTask = (id: number) => {
        router.push(`edit/${id}`)
    }
    let deleteTask = (id: number) => {
        store.removeTask(id);
        router.go(0);
        console.log(`Del-> ${id}`)
    }


</script>

<template>
    <div id="li">
        <span> {{ item.title }} </span>
        <!-- <span>Title: {{ item.title }}</span> -->
        <div id="btn-group">
            <button v-on:click="editTask(item.id)">Edit</button>
            <button v-on:click="deleteTask(item.id)">Delete</button>
        </div>
    </div>
</template>


<style scoped>
    button {
        font-size: 1rem;
        min-width: 50px;
        height: 30px;
    }
    
    #btn-group{
        padding: 3px;
        border: 1px darkcyan dashed;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    span {
        font-size: 2rem;

    }

    #li {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        border: 2px solid var(--vt-c-indigo);
        padding: 0.5rem;
    }

    @media (max-width: 450px) {
        #li > * {
            font-size: 1.2rem;
        }
    }
</style>
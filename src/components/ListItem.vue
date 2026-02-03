<script setup lang="ts">
    import type { Task } from '@/interfaces/Task';
    import { useRouter } from 'vue-router';
    import { useTaskStore } from '@/stores/tasks/tasks';

    const store = useTaskStore();
    const router = useRouter();

    const props = defineProps<{ item: Task }>();

    const editTask = (id: number) => {
        router.push(`edit/${id}`);
    }

    const deleteTask = (id: number) => {
        store.removeTask(id);
    }

    const toggleComplete = () => {
        store.editTask(props.item.id, { 
            completion: !props.item.completion 
        });
    }
</script>

<template>
    <div id="li" :class="{ 'completed-task': item.completion }">
        
        <div class="left-section">
            <input 
                type="checkbox" 
                :checked="item.completion" 
                @change="toggleComplete"
                class="status-checkbox"
            />
            <span class="title"> {{ item.title }} </span>
        </div>

        <div id="btn-group">
            <button 
                class="icon-btn edit" 
                @click="editTask(item.id)" 
                title="Edit"
            >
                &#9998; 
            </button>
            
            <button 
                class="icon-btn delete" 
                @click="deleteTask(item.id)" 
                title="Delete"
            >
                &#128465; 
            </button>
        </div>

    </div>
</template>

<style scoped>
    #li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        padding: 0.8rem 1rem;
        transition: all 0.2s ease;
        
        background: var(--color-background);
        border-bottom: 1px solid var(--color-border);
        color: var(--color-text);
    }

    #li:hover {
        background-color: var(--color-background-soft);
    }

    .left-section {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-grow: 1; 
    }

    .title {
        font-size: 1.8rem;
        transition: opacity 0.2s;
        text-align: left;
        word-break: break-word; 
    }

    .completed-task {
        background-color: var(--color-background-mute) !important;
    }

    .completed-task .title {
        text-decoration: line-through;
        opacity: 0.5; 
    }

    .status-checkbox {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: hsla(160, 100%, 37%, 1); 
    }

    #btn-group {
        display: flex;
        gap: 10px;
        margin-left: 10px;
    }

    .icon-btn {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        transition: transform 0.1s, background-color 0.2s;
        
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        
        color: var(--color-text);
    }

    .icon-btn:hover {
        background-color: var(--color-border);
        transform: scale(1.1);
    }

    .icon-btn.edit:hover {
        color: hsla(160, 100%, 37%, 1); 
    }

    .icon-btn.delete:hover {
        color: #ef4444;
    }

    @media (max-width: 450px) {
        #li {
            padding: 0.5rem;
        }
        .title {
            font-size: 1.2rem;
        }
        .icon-btn {
            font-size: 1.2rem;
            width: 30px;
            height: 30px;
        }
    }
</style>
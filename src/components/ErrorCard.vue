<script setup lang="ts">
    import { useTaskStore } from '@/stores/tasks/tasks';
    const store = useTaskStore();
</script>

<template>
    <div id="error">
        <span>{{ store.state.error || "Error Occurred" }}</span>
    </div>
</template>

<style scoped>
    #error {
        color: #ef4444; 
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 8px;

        display: flex;
        min-height: 100px;
        width: 100%;
        max-width: 800px; 
        margin: 1rem auto;

        justify-content: center;
        align-items: center;
        text-align: center;

        font-weight: 600;
        font-size: 3rem;
    }

    @media (max-width: 600px) {
        #error {
            font-size: 2rem;
            min-height: 80px;
        }
    }
</style>
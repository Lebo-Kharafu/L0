<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import TaskList from '@/components/TaskList.vue';
    import { useTaskStore } from '@/stores/tasks/tasks';

    const store = useTaskStore();
    
    onMounted(() => {
        store.getAll();
    });

    const tasks = computed(() => store.state.tasks);
</script>

<template>
    <div v-if="store.state.error">Error...</div>
    <div v-else-if="store.state.isLoading">Loading...</div>
    <TaskList v-else-if="tasks" :arr="tasks" />
</template>

<style scoped></style>
<script setup lang="ts">
    import TaskList from '@/components/TaskList.vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    const store = useTaskStore();
    store.getAll();

</script>

<template>
    <TaskList v-if="store.state.tasks" :arr="store.state.tasks" />
</template>

<style scoped></style>
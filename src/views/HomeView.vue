<script setup lang="ts">
    import TaskList from '@/components/TaskList.vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    const store = useTaskStore();

    let arr = store.taskData;
</script>

<template>
    <TaskList :arr="arr" />
</template>

<style scoped></style>
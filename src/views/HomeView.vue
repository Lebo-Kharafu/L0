<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import TaskList from '@/components/TaskList.vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    import ErrorView from './ErrorView.vue';
    import LoadingView from './LoadingView.vue';

    const store = useTaskStore();

    onMounted(() => {
        store.getAll();
    });

    const tasks = computed(() => store.state.tasks);
</script>

<template>
    <ErrorView v-if="store.state.error"></ErrorView>
    <LoadingView v-else-if="store.state.isLoading"></LoadingView>
    <TaskList v-else-if="tasks" :arr="tasks" />
</template>

<style scoped></style>
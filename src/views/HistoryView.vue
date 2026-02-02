<script setup lang="ts">
    import { computed } from 'vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    
    const store = useTaskStore();
    
    const historyLog = computed(() => [...store.history].reverse());

    const getActionLabel = (inverseType: string) => {
        switch (inverseType) {
            case 'DEL': return 'CREATE'; 
            case 'ADD': return 'DELETE'; 
            case 'EDIT': return 'UPDATE';
            default: return 'ACTION';
        }
    }

    const getActionClass = (inverseType: string) => {
        switch (inverseType) {
            case 'DEL': return 'badge-create';
            case 'ADD': return 'badge-delete'; 
            case 'EDIT': return 'badge-update';
            default: return '';
        }
    }
</script>

<template>
    <div class="history-container">
        <div class="header">
            <h1>Activity Log</h1>
            <p>Session History Tracking</p>
        </div>

        <div v-if="historyLog.length > 0" class="log-list">
            <div 
                v-for="(item, index) in historyLog" 
                :key="index" 
                class="log-item"
            >
                <div class="status-col">
                    <span :class="['badge', getActionClass(item.inverse)]">
                        {{ getActionLabel(item.inverse) }}
                    </span>
                </div>

                <div class="details-col">
                    <span class="task-title">
                        {{ item.state.title || "Unknown Task" }}
                    </span>
                    <span class="task-id">Ref ID: {{ item.state.id }}</span>
                </div>
            </div>
        </div>

        <div v-else class="empty-state">
            <div class="empty-box">
                <span class="empty-text">-- No Activity Recorded --</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .history-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
        color: var(--color-text);
        font-family: monospace; 
    }

    .header {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 1rem;
    }

    h1 {
        font-size: 2rem;
        margin: 0;
        color: var(--color-heading);
    }

    p {
        margin: 0.5rem 0 0 0;
        opacity: 0.6;
    }

    .log-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .log-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: var(--color-background-soft);
        border: 1px solid var(--color-border);
        border-radius: 4px;
    }

    .status-col {
        min-width: 100px;
    }

    .details-col {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    .badge {
        font-size: 0.8rem;
        font-weight: bold;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        text-transform: uppercase;
        display: inline-block;
        color: white;
    }

    .badge-create { background-color: var(--vt-c-indigo); }
    .badge-delete { background-color: #ef4444; } 
    .badge-update { background-color: #eab308; } 

    .task-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-heading);
    }

    .task-id {
        font-size: 0.8rem;
        opacity: 0.5;
        margin-top: 2px;
    }

    .empty-state {
        display: flex;
        justify-content: center;
        padding: 4rem 0;
    }

    .empty-box {
        border: 1px dashed var(--color-border);
        padding: 2rem 4rem;
        border-radius: 8px;
    }

    .empty-text {
        opacity: 0.5;
        font-size: 1.2rem;
    }

    @media (max-width: 600px) {
        .log-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        .details-col {
            margin-left: 0;
        }
    }
</style>
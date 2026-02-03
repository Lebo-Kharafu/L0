<script setup lang="ts">
    import { ref } from 'vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    import { RouterLink } from 'vue-router';
    import router from '@/router';

    const store = useTaskStore();

    const showMenu = ref(false);
    const showWarning = ref(false);

    const requestRefresh = () => {
        showWarning.value = true;
    }

    const confirmRefresh = () => {
        store.hardRefresh();
        showWarning.value = false;
        router.go(0);
    }
</script>
<template>
    <div id="header">
        <div class="menu-wrapper">
            <span 
                class="icon-btn menu-btn" 
                @click="showMenu = !showMenu"
                title="Menu"
            > 
                &equiv; 
            </span>

            <div v-if="showMenu" class="dropdown">
                <nav>
                    <RouterLink to="/" @click="showMenu = false">Home</RouterLink>
                    <RouterLink to="/history" @click="showMenu = false">History</RouterLink>
                    <RouterLink to="/about" @click="showMenu = false">About</RouterLink>
                </nav>
            </div>
        </div>
        
        <h1>Let's Do</h1>

        <div class="actions">
            <span class="icon-btn danger" @click="requestRefresh" title="Clear All Data">
                <!-- &#128465;  -->
                &#10227;
            </span>
        </div>
    </div>

    <div v-if="showWarning" class="modal-mask" @click.self="showWarning = false">
        <div class="modal-container">
            <h3>Are you sure?</h3>
            <p>This will permanently delete all your local tasks and history.</p>

            <div class="modal-footer">
                <button @click="showWarning = false">Cancel</button>
                <button class="btn-danger" @click="confirmRefresh">Yes, Reset</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    * {
        font-weight: 250;
        font-size: 2.5rem;
    }

    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 0 1rem;
        user-select: none;
        position: relative;
        z-index: 50;
    }

    .menu-wrapper {
        position: relative;
        display: inline-block;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        min-width: 150px;
        z-index: 100;
        padding: 0.5rem 0;
        text-align: left;
    }

    .dropdown nav {
        display: flex;
        flex-direction: column;
    }

    .dropdown a {
        text-decoration: none;
        color: #333;
        font-size: 1.5rem;
        padding: 10px 20px;
        display: block;
        transition: background 0.2s;
    }

    .dropdown a:hover {
        background-color: #f0f0f0;
        font-weight: 400;
    }

    .actions {
        display: flex;
        gap: 1rem;
    }

    .icon-btn {
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .icon-btn:hover {
        transform: scale(1.1);
        font-weight: 400;
    }

    .danger:hover {
        color: crimson;
    }

    .modal-mask {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(2px);
    }

    .modal-container {
        background: var(--color-background);
        color: var(--color-text);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        border: 1px solid var(--color-border);
        max-width: 300px;
        text-align: center;
    }

    .modal-container h3 {
        margin-top: 0;
        font-size: 1.5rem;
        color: var(--color-heading);
    }

    .modal-container p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
        opacity: 0.8;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    button {
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: opacity 0.2s;
    }

    button:hover {
        opacity: 0.9;
    }

    .btn-danger {
        background-color: crimson;
        color: white;
    }
</style>
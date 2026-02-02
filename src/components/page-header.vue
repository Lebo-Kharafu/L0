<script setup lang="ts">
    import { ref } from 'vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    // We assume you have Vue Router set up. If not, change <RouterLink> to <a>
    import { RouterLink } from 'vue-router'; 

    const store = useTaskStore();
    
    // State to toggle the dropdown
    const showMenu = ref(false);
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
                    <RouterLink to="/about" @click="showMenu = false">About</RouterLink>
                </nav>
            </div>
        </div>

        <h1>Let's Do</h1>

        <div class="actions">
            <span 
                class="icon-btn danger" 
                @click="store.hardRefresh"
                title="Clear All Data"
            > 
                &#128465; 
            </span>
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
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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

    /*.icon-btn:active {
        transform: scale(1.2);
    }*/

    .danger:hover {
        color: crimson; 
    }
</style>
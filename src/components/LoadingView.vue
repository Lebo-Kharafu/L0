<script setup lang="ts">
</script>

<template>
    <div id="loading">
        Loading...
    </div>
</template>

<style scoped>
    #loading {
        /* Use theme colors */
        color: var(--color-text);
        
        display: flex;
        width: 100%;
        min-height: 150px;

        justify-content: center;
        align-items: center;
        text-align: center;

        font-weight: 300;
        font-size: 3rem;
        
        /* Optional: Add a subtle pulse animation */
        animation: pulse 1.5s infinite ease-in-out;
    }

    @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }

    @media (max-width: 600px) {
        #loading {
            font-size: 2rem;
        }
    }
</style>
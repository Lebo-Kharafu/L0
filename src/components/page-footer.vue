<script setup lang="ts">
    
</script>

<template>
    <div id="footer">
        <!-- <h2>Since 2026</h2> -->
        <h2><RouterLink to="/about">About</RouterLink></h2>
    </div>
</template>

<style scoped>
    h2 {
        font-weight: 250;
        font-size: 1.5rem;
    }

    #footer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
    }
</style>
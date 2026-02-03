<script setup lang="ts">
</script>

<template>
    <div id="not-found">
        404 - Not Found
    </div>
</template>

<style scoped>
    #not-found {
        color: var(--color-text);
        background-color: var(--color-background-soft);
        border: 1px dashed var(--color-border);
        border-radius: 8px;

        display: flex;
        min-height: 200px;
        width: 100%;
        margin: 2rem auto;

        justify-content: center;
        align-items: center;
        text-align: center;

        font-weight: 600;
        font-size: 4rem;
    }

    @media (max-width: 600px) {
        #not-found {
            font-size: 2.5rem;
        }
    }
</style>
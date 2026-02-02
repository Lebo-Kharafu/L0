<script setup lang="ts">

</script>

<template>
    <div id="not-found">
        {{ "NOt-fOUND" }}
    </div>
</template>

<style scoped>
    #not-found{
        background-color: firebrick;
        color: aquamarine;

        display: flex;

        min-height: 100px;
        max-height: 250px;
        width: 100%;

        justify-content: space-around;
        align-items: center;
        text-align: center;

        font-weight: 600;
        font-size: 6rem;
    }
</style>
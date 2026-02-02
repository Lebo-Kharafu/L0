<script setup lang="ts">

</script>

<template>
    <div id="loading">
        {{ "loading" }}
    </div>
</template>

<style scoped>
    #loading{
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
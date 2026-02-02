<script setup lang="ts">

</script>

<template>
    <div id="error">
        {{ "error" }}
    </div>
</template>

<style scoped>
    #error{
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
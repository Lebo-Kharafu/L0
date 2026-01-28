<script setup lang="ts">
import ListItem from './ListItem.vue';
    let props = defineProps({
        arr:Object,
    })
</script>

<template>
    <div>
        <ul>
            <li v-for="obj in arr">
                <ListItem :key="obj?.id" :item="obj"></ListItem>
            </li>
        </ul>
    </div>
</template>


<style scoped>
    ul{
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        flex-direction: column;
        gap: 1rem;
    }
</style>
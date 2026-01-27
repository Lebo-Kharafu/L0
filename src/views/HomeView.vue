<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';

let arr = [
        {id:1,title:"run",completion:false},
        {id:2,title:"walk",completion:true},
        {id:3,title:"wake",completion:true},
    ]
</script>

<template>
    <TaskList :arr = "arr"/>
</template>

<style scoped>

</style>
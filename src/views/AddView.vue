<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import { ref } from 'vue';
let arr = ref([
        {id:1,title:"run",completion:false},
        {id:2,title:"walk",completion:true},
        {id:3,title:"wake",completion:true},
    ])

    let taskTitle = ref("");
    const add = () => {
        // TODO: ADD TO ACTUAL DATA STORE
        arr.value.push({id:arr.value.length,title:taskTitle.value,completion:false})
    }
</script>

<template>
    <div id="add-form">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" v-model="taskTitle">
        <button v-on:click="add">ADD TASK</button>
    </div>
    <div id="task-list">
        <TaskList :arr="arr" />
    </div>
</template>

<style scoped>
#add-form {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 2rem;
    font-weight: 300;
    justify-content: center;
    gap: 2rem;
}

input {
    width: 50%;
    height: 25px;
}

button{
     height: 30px;
}
</style>
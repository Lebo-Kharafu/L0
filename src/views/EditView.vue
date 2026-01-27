<script setup lang="ts">
import type { Task } from '@/interfaces/Task';
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue';


const router = useRouter()
const route = useRoute() 

console.log(route.params.id)

let temp  = ref<Task>({
    title: "Name",
    date: "2000-00-12",
    completion: true,
    id: 0,
})

let oldtitle = ref(temp.value.title);
let newtitle = ref("");
let completion = ref(temp.value.completion);

let saveEdit = () => {
    // TODO: FINISH SAVE EDIT
    console.log("Save")
    router.push("/")
}

    
</script>

<template> 
<div id="edit-form">
    <div id="edit-title">
        <label for="title"> New-Title: </label>
        <input id="title" type="text" name="title" v-model="newtitle">
        <p>Old-title: {{ oldtitle}} -> {{ newtitle }}</p>
    </div>
    <div id="edit-completion">
        <label for="completion"> Completed</label>
        <input id="completion" type="checkbox" name="completion" v-model="completion">
    </div>
    <button v-on:click="saveEdit">Done</button>
</div>
</template>

<style scoped>

    #edit-form{
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    #edit-title{
        max-height: 25px;
        display: flex;
        flex-direction: row;

        align-items: center;
        gap: 1rem;
    }

    #edit-completion{
        max-height: 25px;
        display: flex;
        flex-direction: row;

        align-items: center;
        gap: 1rem;
    }

    p {
        color: aquamarine;
    }
    
</style>
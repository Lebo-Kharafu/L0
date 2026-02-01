<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router'
    import { ref } from 'vue';

    import { useTaskStore } from '@/stores/tasks/tasks';
    const store = useTaskStore();



    const router = useRouter()
    const route = useRoute()
    let id = parseInt(route.params.id as string);
    let task = store.getTask(id);
    console.log(route.params.id)


    let oldtitle = ref(task?.title);
    let newtitle = ref("");
    let completion = ref(task?.completion);

    let saveEdit = () => {
        store.updateTask(id, { title: newtitle.value.length > 0 ? newtitle.value : oldtitle.value, completion: completion.value })
        try {
            router.back()
        } catch (error) {
            router.push("/")
        }
    }


</script>

<template>
    <div id="edit-form">
        <div id="edit-title">
            <label for="title"> New-Title: </label>
            <input id="title" type="text" name="title" v-model="newtitle">
            <p>Old-title: {{ oldtitle }} -> {{ newtitle }}</p>
        </div>
        <div id="edit-completion">
            <label for="completion"> Completed</label>
            <input id="completion" type="checkbox" name="completion" v-model="completion">
        </div>
        <button v-on:click="saveEdit">Done</button>
    </div>
</template>

<style scoped>

    #edit-form {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    #edit-title {
        max-height: 25px;
        display: flex;
        flex-direction: row;

        align-items: center;
        gap: 1rem;
    }

    #edit-completion {
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
<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router'
    import { ref, onMounted } from 'vue';
    import { useTaskStore } from '@/stores/tasks/tasks';
    import LoadingView from '@/components/LoadingCard.vue';

    const store = useTaskStore();
    const router = useRouter(); 
    const route = useRoute();

    const id = parseInt(route.params.id as string);
    const isLoading = ref(true);
    const originalTitle = ref("");
    const newTitle = ref("");
    const isCompleted = ref(false);

    onMounted(async () => {
        const foundTask = await store.getTask(id);
        if (foundTask) {
            originalTitle.value = foundTask.title;
            newTitle.value = foundTask.title;
            isCompleted.value = foundTask.completion;
            isLoading.value = false;
        } else {
            console.error("Task not found");
            router.push("/");
        }
    });

    const saveEdit = async () => {
        const finalTitle = newTitle.value.trim() === "" ? originalTitle.value : newTitle.value;
        await store.editTask(id, {
            title: finalTitle,
            completion: isCompleted.value
        });
        try { router.back(); } catch (error) { router.push("/"); }
    }
</script>

<template>
    <LoadingView v-if="isLoading" />
    <div v-else id="edit-form">

        <div id="edit-title">
            <label for="title">Title:</label>
            <input 
                id="title" 
                type="text" 
                v-model="newTitle" 
                placeholder="Task Name"
            >
        </div>

        <p v-if="originalTitle !== newTitle" class="diff-text">
            Changing: <span>{{ originalTitle }}</span> &rarr; <span>{{ newTitle }}</span>
        </p>

        <div id="edit-completion">
            <label for="completion">Completed:</label>
            <input 
                id="completion" 
                type="checkbox" 
                v-model="isCompleted"
                class="status-checkbox"
            >
        </div>

        <button class="save-btn" @click="saveEdit">Done</button>
    </div>
</template>

<style scoped>
    #edit-form {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        max-width: 100%;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        color: var(--color-text);
    }

    #edit-title,
    #edit-completion {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 600px;
    }

    input[type="text"] {
        font-size: 1.5rem;
        padding: 0.5rem;
        flex-grow: 2;
        background: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 4px;
    }
    
    input[type="text"]:focus {
        outline: 2px solid var(--vt-c-indigo);
    }

    .status-checkbox {
        width: 25px;
        height: 25px;
        accent-color: hsla(160, 100%, 37%, 1);
        cursor: pointer;
    }

    .diff-text {
        font-size: 1.2rem;
        color: var(--color-text);
        opacity: 0.7;
        margin-left: 2rem;
    }

    .diff-text span {
        color: hsla(160, 100%, 37%, 1); 
        font-weight: bold;
    }

    .save-btn {
        font-size: 1.5rem;
        padding: 0.5rem 2rem;
        cursor: pointer;
        align-self: center;
        border: none;
        color: white;
        transition: opacity 0.2s;
    }

    .save-btn:hover {
        opacity: 0.9;
    }

    @media (max-width: 450px) {
        #edit-form {
            padding: 1rem;
        }

        #edit-title {
            flex-direction: column;
            align-items: stretch; 
            gap: 0.5rem;
        }

        #edit-title input[type="text"] {
            width: 100%;
            font-size: 1.2rem;
        }

        #edit-completion {
            justify-content: space-between;
        }

        .save-btn {
            width: 100%;
            padding: 1rem;
            margin-top: 1rem;
        }

        .diff-text {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
            text-align: center;
            margin: 0;
        }
    }
</style>
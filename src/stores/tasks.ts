import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/interfaces/Task'

export const useTaskStore = defineStore('task', () => {
  const taskData = ref<Task[]>([]);

  function addTask(newTask:Task) {
    console.log(newTask);
  }

  function updateTask(id:number,newdata:Partial<Task>) {
    console.log(newdata);
  }

  function deleteTask(id:number) {
    console.log(id);
  }

  return { taskData, addTask, deleteTask, updateTask}
})

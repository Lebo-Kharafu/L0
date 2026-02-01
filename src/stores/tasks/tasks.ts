import type { Task } from '@/interfaces/Task'
import { fetchAllTask, fetchTask } from "./tasksEffect";
import { update } from "./tasksUpdate";
import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import {
  initialModel,
  type taskModelArray,
  type initialArray,
  type TaskMsg,
} from "./tasksModel";

export const useTaskStore = defineStore('task', () => {
  const taskData = ref<Task[]>([]);

  function addTask(newTask: Task) {
    taskData.value.push(newTask)
  }

  function getTask(id: number) {
    return taskData.value.find(x => x.id === id);
  }

  function updateTask(id: number, newdata: Partial<Task>) {

    let old = taskData.value.find(x => x.id === id);
    if (old) {
      Object.assign(old, newdata);
    }
    console.log(old);
  }

  function deleteTask(id: number) {
    taskData.value = taskData.value.filter(x => x.id !== id);
  }

  return { taskData, addTask, deleteTask, updateTask, getTask }
})

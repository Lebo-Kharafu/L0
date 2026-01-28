import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/interfaces/Task'

export const useTaskStore = defineStore('task', () => {
  const taskData = ref<Task[]>(
    [
        {id:1,title:"run",completion:false,date:"2005-12-25"},
        {id:2,title:"walk",completion:true,date:"2005-12-25"},
        {id:3,title:"wake",completion:true,date:"2005-12-25"},
    ]
  );

  function addTask(newTask:Task) {
    taskData.value.push(newTask)
  }

  function getTask(id:number) {
    return taskData.value.find( x => x.id === id);
  }

  function updateTask(id:number,newdata:Partial<Task>) {
    
    let old = taskData.value.find( x => x.id === id);
    if(old){
        Object.assign(old,newdata);
    }
    console.log(old);
  }

  function deleteTask(id:number) {
    taskData.value = taskData.value.filter( x => x.id !== id);
  }

  return { taskData, addTask, deleteTask, updateTask, getTask}
})

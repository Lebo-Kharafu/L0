import type { Task } from '@/interfaces/Task'
import { defineStore } from "pinia";
import { ref, readonly } from "vue";

import {
  initialModel,
  type TaskModel,
  type TaskMsg,


  type taskModelSingle,
  type taskModelArray,
  initialSingle,
  initialArray,
} from './tasksModel';

import {
  fetchAllTask,
  fetchTask,
  postTask,
  deleteTask,
  updateTask
} from './tasksEffect';
import { update } from './tasksUpdate';

export const useTaskStore = defineStore('task', () => {
  // const listModel = ref<taskModelArray>(initialArray);
  // const singleModel = ref<taskModelSingle>(initialSingle);
  const model = ref<TaskModel>(initialModel);

  const dispatch = (msg: TaskMsg) => {
      model.value = update(model.value,msg);
  }

  const getAll = async () => {
    await fetchAllTask(dispatch);
  }

  const getTask = async (id:number) => {
    await fetchTask(id,dispatch);
  }

  const addTask = async (newTask:Partial<Task>) => {
    await postTask(newTask,dispatch);
  }

  const editTask = async (id:number,newInfo:Partial<Task>) => {
    await updateTask(id,newInfo,dispatch);
  }

  const removeTask = async (id:number) => {
    await deleteTask(id,dispatch);
  }

  return {
    getAll,
    getTask,
    addTask,
    editTask,
    removeTask,
    state: readonly(model)
  }
})

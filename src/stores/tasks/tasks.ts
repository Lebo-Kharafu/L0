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
  const initialized = ref<boolean>(false);
  interface invertState {
    inverse:string;
    state: Partial<Task>;
  }
  const history = ref<invertState[]>([]);
  const model = ref<TaskModel>(initialModel);

  const dispatch = (msg: TaskMsg) => {
      model.value = update(model.value,msg);
  }

  const getAll = async () => {
    if(!initialized){
      await fetchAllTask(dispatch);
    }else{
      // TODO: GET FROM PERSISTENT STATE
    }
  }

  const getTask = async (id:number) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await fetchTask(id,dispatch);

    // TODO: GET FROM PERSISTENT STATE
  }

  const addTask = async (newTask:Partial<Task>) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await postTask(newTask,dispatch);

    // TODO: ADD FROM PERSISTENT STATE AND TRACK
    // history.value.push({inverse:"DEL",state:newTask);
  }

  const editTask = async (id:number,newInfo:Partial<Task>) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await updateTask(id,newInfo,dispatch);

    // TODO: EDIT FROM PERSISTENT STATE AND TRACK
    // history.value.push({inverse:"EDIT",state:{id:id,...newInfo}})
  }

  const removeTask = async (id:number) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await deleteTask(id,dispatch);

    // TODO: REMOVE FROM PERSISTENT STATE AND TRACK
    // history.value.push({inverse:"ADD",state:getTask(id));
  }

  const undo = async () => {
    // TODO: RETRIEVE STATE AND INVERT
    const latest = history.value.pop();
    switch (latest?.inverse) {
      case "ADD":
        // TODO: ADD THE STATE
        break;

      case "DEL":
        // TODO: DEL THE STATE
        break;

      case "EDIT":
        // TODO: EDIT THE STATE
        break;
    
      default:
        break;
    }
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

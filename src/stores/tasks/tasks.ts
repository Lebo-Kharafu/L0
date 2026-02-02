import type { Task } from '@/interfaces/Task'
import { defineStore } from "pinia";
import { ref, readonly, watch } from "vue";
// import { useLocalStorage } from '@vueuse/core'; 

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

  watch(history, (newVal, oldVal) => { console.log('History changed:', newVal); }, { deep: true });

  watch(model, (newVal, oldVal) => { console.log('Model changed:', newVal); }, { deep: true });

  const dispatch = (msg: TaskMsg) => {
      model.value = update(model.value,msg);
  }

  const getAll = async () => {
    if(!initialized.value){
      
      const localData = localStorage.getItem('taskList');
      const localHistory = localStorage.getItem('history');
      const localFlag = localStorage.getItem('task_initialized');
      
      if (localFlag && localData) {
        model.value.tasks = JSON.parse(localData);
        if(localHistory){
           history.value = JSON.parse(localHistory);
        }
        initialized.value = true;
      } else {
        await fetchAllTask(dispatch);
        localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
        localStorage.setItem('history', JSON.stringify(history.value));
        localStorage.setItem('task_initialized', 'true');
        initialized.value = true;
      }

    } else {
      const localData = localStorage.getItem('taskList');
      if (localData) {
        model.value.tasks = JSON.parse(localData);
      }
    }
  }


  const getTask = async (id:number) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await fetchTask(id,dispatch);
    const stateTask = model.value.tasks?.find((t: any) => t.id === id);

    if (stateTask) {
      model.value.error = null;
      return stateTask;
    }

    const localData = localStorage.getItem('taskList');

    if (localData) {
      const tasks = JSON.parse(localData);
      const localTask = tasks.find((t: any) => t.id === id);
      model.value.error = null;
      return localTask;
    }

    model.value.error = "ITEM NOT FOUND";
    return undefined;
  }


const addTask = async (newTask: Omit<Task, "id">) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await postTask(newTask,dispatch);

    const stateTask = model.value.tasks;
    
    if (stateTask) {
      const lastIndx = stateTask.length - 1;
      const id = stateTask.length > 0 && stateTask[lastIndx]?.id 
        ? stateTask[lastIndx].id + 1 
        : Math.floor(Math.random() * 1000);

      const finalTask = { id: id, ...newTask };

      model.value.error = null;
      model.value.tasks?.push(finalTask);

      localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
      
      history.value.push({ 
        inverse: "DEL", 
        state: { id: id } 
      });
      localStorage.setItem('history', JSON.stringify(history.value));

      return finalTask;
    }
  }

const editTask = async (id: number, newInfo: Partial<Task>) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await updateTask(id,newInfo,dispatch);

    const task = model.value.tasks?.find((t) => t.id === id);

    if (task) {
      const updatedTask = { ...task, ...newInfo };

      let ind = model.value.tasks?.findIndex((t) => t.id === id);
      if (ind !== undefined && ind !== -1 && model.value.tasks) {
        model.value.tasks[ind] = updatedTask;
      }

      localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
      
      history.value.push({ inverse: "EDIT", state: task });
      localStorage.setItem('history', JSON.stringify(history.value));
    }
  }

  const removeTask = async (id:number) => {
    // ! ONLY WORKS ON REAL API NOT MOCK
    // await deleteTask(id,dispatch);

    const task = model.value.tasks?.find((t) => t.id === id);
    if (!task) {return};

    model.value.tasks = model.value.tasks?.filter((x) => x.id !== id);

    localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
    
    const { id: removedId, ...usableTask } = task;
    // history.value.push({ inverse: "ADD", state: usableTask });
    history.value.push({ inverse: "ADD", state: {...task} });
    localStorage.setItem('history', JSON.stringify(history.value));
  }

  const hardRefresh = async () => {
    model.value = initialModel;
    history.value = [];
    localStorage.clear();
  }

  const undo = async () => {
    const latest = history.value.pop();
    if (!latest || !model.value.tasks) return;
    switch (latest?.inverse) {
      case "ADD":
        model.value.tasks.push(latest.state as Task);
        break;

      case "DEL":
        model.value.tasks = model.value.tasks.filter(t => t.id !== latest.state.id);
        break;

      case "EDIT":
        const index = model.value.tasks.findIndex(t => t.id === latest.state.id);
        if (index !== -1) {
          model.value.tasks[index] = latest.state as Task;
        }
        break;
    
      default:
        break;
      }

      localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
  }


  return {
    undo,
    getAll,
    getTask,
    addTask,
    editTask,
    removeTask,
    hardRefresh,
    state: readonly(model)
  }
})

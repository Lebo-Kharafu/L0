import type { Task } from '@/interfaces/Task'
import { defineStore } from "pinia";
import { ref, readonly, watch } from "vue";
// import { useLocalStorage } from '@vueuse/core'; 

import {
  initialModel,
  type TaskModel,
  type TaskMsg,

} from './tasksModel';

import {
  fetchAllTask,
  fetchTask,
  postTask,
  deleteTask,
  updateTask,
  redoLastAction,
  undoLastAction,
} from './tasksEffect';
import { update } from './tasksUpdate';

export const useTaskStore = defineStore('task', () => {
  const initialized = ref<boolean>(false);
  interface invertState {
    inverse: string;
    state: Partial<Task>;
  }
  const historyStack = ref<invertState[]>([]);
  const redoStack = ref<invertState[]>([]);
  const model = ref<TaskModel>(initialModel);

  watch(historyStack, (newVal, oldVal) => { console.log('History changed:', newVal); }, { deep: true });

  watch(model, (newVal, oldVal) => { console.log('Model changed:', newVal); }, { deep: true });

  const dispatch = (msg: TaskMsg) => {
    model.value = update(model.value, msg);

    if ('history' in msg && msg.history) {
      historyStack.value = msg.history;
    }

    if ('redo' in msg && msg.redo) {
      redoStack.value = msg.redo;
    }

    if (msg.type === "FETCH_ALL_SUCCESS") {
      initialized.value = true;
    }

  }

  const getAll = async () => {
    await fetchAllTask(dispatch);
  }

  const getTask = async (id: number) => {
    await fetchTask(id, dispatch);
  }

  const addTask = async (newTask: Omit<Task, "id">) => {
    await postTask(newTask, dispatch);
  }

  const editTask = async (id: number, newInfo: Partial<Task>) => {

    await updateTask(id, newInfo, dispatch);
  }

  const removeTask = async (id: number) => {
    await deleteTask(id, dispatch);
  }

  const hardRefresh = async () => {
    model.value = initialModel;
    initialized.value = false;
    historyStack.value = [];
    localStorage.clear();
  }

  const undo = async () => {
    await undoLastAction(dispatch);
  }

  const redo = async () => {
    await redoLastAction(dispatch);
  }


  return {
    undo,
    redo,
    getAll,
    getTask,
    addTask,
    editTask,
    removeTask,
    hardRefresh,
    state: readonly(model),
    historyStack: readonly(historyStack),
    redoStack: readonly(redoStack)
  }
})

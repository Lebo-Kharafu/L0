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
  }

  const getAll = async () => {
    if (!initialized.value) {

      const localData = localStorage.getItem('taskList');
      const localHistory = localStorage.getItem('history');
      const localFlag = localStorage.getItem('task_initialized');

      if (localFlag && localData) {
        model.value.tasks = JSON.parse(localData);
        if (localHistory) {
          historyStack.value = JSON.parse(localHistory);
        }
        initialized.value = true;
      } else {
        await fetchAllTask(dispatch);
        // TODO: ADD ERROR HANDLING
        localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
        localStorage.setItem('history', JSON.stringify(historyStack.value));
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


  const getTask = async (id: number) => {

    // await fetchTask(id,dispatch); // ! ONLY WORKS ON REAL API NOT MOCK
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

    model.value.error = "Task does not exist";
    return undefined;
  }


  const addTask = async (newTask: Omit<Task, "id">) => {

    // await postTask(newTask,dispatch); // ! ONLY WORKS ON REAL API NOT MOCK

    const stateTask = model.value.tasks;

    if (stateTask) {
      const lastIndx = stateTask.length - 1;
      const id = stateTask.length > 0 && stateTask[lastIndx]?.id
        ? stateTask[lastIndx].id + 1
        : Math.floor(Math.random() * 1000);

      const finalTask = { id: id, ...newTask };

      model.value.error = null;
      model.value.tasks?.push(finalTask);

      // TODO: ADD ERROR HANDLING
      localStorage.setItem('taskList', JSON.stringify(model.value.tasks));

      historyStack.value.push({
        inverse: "DEL",
        state: { id: id }
      });
      // TODO: ADD ERROR HANDLING
      localStorage.setItem('history', JSON.stringify(historyStack.value));

      redoStack.value = [];
      localStorage.setItem('redo', JSON.stringify(redoStack.value));

      return finalTask;
    }
  }

  const editTask = async (id: number, newInfo: Partial<Task>) => {

    // await updateTask(id,newInfo,dispatch); // ! ONLY WORKS ON REAL API NOT MOCK

    const task = model.value.tasks?.find((t) => t.id === id);

    if (task) {
      const updatedTask = { ...task, ...newInfo };

      let ind = model.value.tasks?.findIndex((t) => t.id === id);
      if (ind !== undefined && ind !== -1 && model.value.tasks) {
        model.value.tasks[ind] = updatedTask;
      }

      // TODO: ADD ERROR HANDLING
      localStorage.setItem('taskList', JSON.stringify(model.value.tasks));

      historyStack.value.push({ inverse: "EDIT", state: task });
      // TODO: ADD ERROR HANDLING
      localStorage.setItem('history', JSON.stringify(historyStack.value));
      redoStack.value = [];
      localStorage.setItem('redo', JSON.stringify(redoStack.value));
    }
  }

  const removeTask = async (id: number) => {

    // await deleteTask(id,dispatch); // ! ONLY WORKS ON REAL API NOT MOCK

    const task = model.value.tasks?.find((t) => t.id === id);
    if (!task) { return };

    model.value.tasks = model.value.tasks?.filter((x) => x.id !== id);

    // TODO: ADD ERROR HANDLING
    localStorage.setItem('taskList', JSON.stringify(model.value.tasks));

    const { id: removedId, ...usableTask } = task;
    historyStack.value.push({ inverse: "ADD", state: { ...task } });
    // TODO: ADD ERROR HANDLING
    localStorage.setItem('history', JSON.stringify(historyStack.value));

    redoStack.value = [];
    localStorage.setItem('redo', JSON.stringify(redoStack.value));
  }

  const hardRefresh = async () => {
    model.value = initialModel;
    initialized.value = false;
    historyStack.value = [];
    localStorage.clear();
  }

  const undo = async () => {
    const latest = historyStack.value.pop();
    if (!latest || !model.value.tasks) return;
    switch (latest?.inverse) {
      case "ADD":
        // TODO: ADD ERROR HANDLING
        model.value.tasks.push(latest.state as Task);
        redoStack.value.push({ inverse: "DEL", state: { id: latest.state.id } });
        break;

      case "DEL":
        // TODO: ADD ERROR HANDLING
        const taskToSave = model.value.tasks.find(t => t.id === latest.state.id);
        if (taskToSave) {
             redoStack.value.push({ inverse: "ADD", state: { ...taskToSave } });
        }
        model.value.tasks = model.value.tasks.filter(t => t.id !== latest.state.id);
        break;

      case "EDIT":
        // TODO: ADD ERROR HANDLING
        const index = model.value.tasks.findIndex(t => t.id === latest.state.id);
        if (index !== -1) {
          const currentState = { ...model.value.tasks[index] };
          redoStack.value.push({ inverse: "EDIT", state: currentState });
          model.value.tasks[index] = latest.state as Task;
        }
        break;

      default:
        break;
    }

    // TODO: ADD ERROR HANDLING
    localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
    localStorage.setItem('history', JSON.stringify(historyStack.value));
    localStorage.setItem('redo', JSON.stringify(redoStack.value));
  }

  const redo = async () => {
    const future = redoStack.value.pop();
    if (!future || !model.value.tasks) return;

    switch (future?.inverse) {
      case "ADD":
        // TODO: ADD ERROR HANDLING
        model.value.tasks.push(future.state as Task);
        historyStack.value.push({ inverse: "DEL", state: { id: future.state.id }});
        break;

      case "DEL":
        // TODO: ADD ERROR HANDLING
        const taskToDel = model.value.tasks.find(t => t.id === future.state.id);
        if (taskToDel) {
            historyStack.value.push({ inverse: "ADD", state: { ...taskToDel } });
            model.value.tasks = model.value.tasks.filter(t => t.id !== future.state.id);
        }
        break;

      case "EDIT":
        // TODO: ADD ERROR HANDLING
        const index = model.value.tasks.findIndex(t => t.id === future.state.id);
        if (index !== -1) {
          const oldState = { ...model.value.tasks[index] };
          historyStack.value.push({ inverse: "EDIT", state: oldState });

          model.value.tasks[index] = future.state as Task;
        }
        break;

      default:
        break;
    }

    // TODO: ADD ERROR HANDLING
    localStorage.setItem('taskList', JSON.stringify(model.value.tasks));
    localStorage.setItem('history', JSON.stringify(historyStack.value));
    localStorage.setItem('redo', JSON.stringify(redoStack.value));
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

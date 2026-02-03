import type { InvertState, TaskMsg } from "./tasksModel";
import type { Task } from "@/interfaces/Task";

export async function fetchAllTask(
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "FETCH_ALL_REQUEST" });

  try {

    const localFlag = localStorage.getItem('task_initialized');
    const localData = localStorage.getItem('taskList');
    const localHistory = localStorage.getItem('history');
    const localRedo = localStorage.getItem('redo');

    if (localFlag && localData) {
      //  console.log("Loading from LocalStorage");

      dispatch({
        type: "FETCH_ALL_SUCCESS",
        tasks: JSON.parse(localData),
        history: localHistory ? JSON.parse(localHistory) : [],
        redo: localRedo ? JSON.parse(localRedo) : []
      });

    } else {
      // console.log("Fetching from API");

      const res = await fetch(`api/tasks`);
      if (!res.ok) throw new Error("No Tasks found");
      const data = await res.json();

      localStorage.setItem('taskList', JSON.stringify(data.data));
      localStorage.setItem('history', '[]');
      localStorage.setItem('redo', '[]');
      localStorage.setItem('task_initialized', 'true');

      dispatch({
        type: "FETCH_ALL_SUCCESS",
        tasks: data.data,
        history: [],
        redo: []
      });
    }

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function fetchTask(
  id: number,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "FETCH_ONE_REQUEST", id });

  try {
    /* 
     const res = await fetch(`api/task/${id}`); // ! only works if we have a api
     if (!res.ok) throw new Error("Not found");
     const data = await res.json(); 
     dispatch({ type: "FETCH_ONE_SUCCESS", task: data.data });
    */

    const localData = localStorage.getItem('taskList');

    if (!localData) {
      throw new Error("Task list is empty");
    }

    const tasks = JSON.parse(localData);
    const foundTask = tasks.find((t: any) => t.id === id);

    if (!foundTask) {
      throw new Error("Task not found");
    }

    dispatch({ type: "FETCH_ONE_SUCCESS", task: foundTask });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function postTask(
  task: Omit<Task, "id">,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "ADD_ONE_REQUEST", task });

  try {
    /*const res = await fetch(`api/task/add`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task), 
    });
    if (!res.ok) throw new Error("Post failed");
    const data = await res.json();
    dispatch({ type: "ADD_ONE_SUCCESS", task: data.data });*/

    const tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    const lastIndx = tasks.length - 1;
    const newId = tasks.length > 0 && tasks[lastIndx]?.id
      ? tasks[lastIndx].id + 1
      : Math.floor(Math.random() * 1000);

    const finalTask = { id: newId, ...task };

    tasks.push(finalTask);

    history.push({
      inverse: "DEL",
      state: { id: newId }
    });

    const redo: InvertState[] = [];

    localStorage.setItem('taskList', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('redo', JSON.stringify(redo));

    dispatch({
      type: "ADD_ONE_SUCCESS",
      task: finalTask,
      history,
      redo
    });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function updateTask(
  id: number,
  changes: Partial<Task>,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "UPDATE_ONE_REQUEST", id });

  try {
    /*const res = await fetch(`api/edit/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes), 
    });
    if (!res.ok) throw new Error("Update failed");
    const data = await res.json();
    dispatch({ type: "UPDATE_ONE_SUCCESS", task: data.data });*/

    const tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    const index = tasks.findIndex((t: any) => t.id === id);
    if (index === -1) throw new Error("Task not found");

    const oldTask = tasks[index];

    const updatedTask = { ...oldTask, ...changes };
    tasks[index] = updatedTask;

    history.push({ inverse: "EDIT", state: oldTask });

    const redo: InvertState[] = [];

    localStorage.setItem('taskList', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('redo', JSON.stringify(redo));

    dispatch({
      type: "UPDATE_ONE_SUCCESS",
      task: updatedTask,
      history,
      redo
    });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function deleteTask(
  id: number,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "DELETE_ONE_REQUEST", id });

  try {
    /*const res = await fetch(`api/task/del/${id}`, {
      method: "DELETE", 
    });
    if (!res.ok) throw new Error("Delete failed");
    dispatch({ type: "DELETE_ONE_SUCCESS", deleted: true });*/

    let tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    const taskToDelete = tasks.find((t: any) => t.id === id);

    if (!taskToDelete) {
      throw new Error("Task not found");
    }

    tasks = tasks.filter((t: any) => t.id !== id);

    history.push({
      inverse: "ADD",
      state: taskToDelete
    });

    const redo: any[] = [];

    localStorage.setItem('taskList', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('redo', JSON.stringify(redo));

    dispatch({
      type: "DELETE_ONE_SUCCESS",
      id: id,
      history,
      redo
    });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function undoLastAction(
  dispatch: (m: TaskMsg) => void
) {
  try {

    let tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const redo = JSON.parse(localStorage.getItem('redo') || '[]');

    const latest = history.pop();

    if (!latest) return;

    switch (latest.inverse) {
      case "ADD":
        tasks.push(latest.state);
        redo.push({ inverse: "DEL", state: { id: latest.state.id } });
        break;

      case "DEL":
        const taskToSave = tasks.find((t: any) => t.id === latest.state.id);
        if (taskToSave) {
          redo.push({ inverse: "ADD", state: taskToSave });
        }
        tasks = tasks.filter((t: any) => t.id !== latest.state.id);
        break;

      case "EDIT":
        const index = tasks.findIndex((t: any) => t.id === latest.state.id);
        if (index !== -1) {
          const stateBeforeUndo = { ...tasks[index] };
          tasks[index] = latest.state;
          redo.push({ inverse: "EDIT", state: stateBeforeUndo });
        }
        break;
    }

    localStorage.setItem('taskList', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('redo', JSON.stringify(redo));

    dispatch({
      type: "FETCH_ALL_SUCCESS",
      tasks: tasks,
      history,
      redo
    });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function redoLastAction(
  dispatch: (m: TaskMsg) => void
) {
  try {

    let tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const redo = JSON.parse(localStorage.getItem('redo') || '[]');

    const future = redo.pop();

    if (!future) return;

    switch (future.inverse) {
      case "ADD":
        tasks.push(future.state);
        history.push({ inverse: "DEL", state: { id: future.state.id } });
        break;

      case "DEL":
        const taskToDel = tasks.find((t: any) => t.id === future.state.id);
        if (taskToDel) {
          history.push({ inverse: "ADD", state: { ...taskToDel } });
          tasks = tasks.filter((t: any) => t.id !== future.state.id);
        }
        break;

      case "EDIT":
        const index = tasks.findIndex((t: any) => t.id === future.state.id);
        if (index !== -1) {
          const oldState = { ...tasks[index] };
          tasks[index] = future.state;

          history.push({ inverse: "EDIT", state: oldState });
        }
        break;
    }

    localStorage.setItem('taskList', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('redo', JSON.stringify(redo));

    dispatch({
      type: "FETCH_ALL_SUCCESS",
      tasks: tasks,
      history,
      redo
    });

  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function hardRefreshAction(
  dispatch: (m: TaskMsg) => void
) {
  try {
    localStorage.clear();
    
    // Alternative: If you only want to clear this app's data:
    // localStorage.removeItem('taskList');
    // localStorage.removeItem('history');
    // localStorage.removeItem('redo');
    // localStorage.removeItem('task_initialized');

    // 2. Dispatch Success
    dispatch({ type: "RESET_SUCCESS" });
    
  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}



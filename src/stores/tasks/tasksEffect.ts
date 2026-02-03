import type { TaskMsg } from "./tasksModel";
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
       // --- OFFLINE MODE ---
       console.log("Loading from LocalStorage");
       
       dispatch({ 
         type: "FETCH_ALL_SUCCESS", 
         tasks: JSON.parse(localData),
         // Pass the stacks along with the tasks
         history: localHistory ? JSON.parse(localHistory) : [],
         redo: localRedo ? JSON.parse(localRedo) : []
       });

    } else {
      console.log("Fetching from API");

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
  task: Partial<Task>,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "ADD_ONE_REQUEST", task });

  try {
    const res = await fetch(`api/task/add`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task), 
    });

    if (!res.ok) throw new Error("Post failed");
    
    const data = await res.json();

    dispatch({ type: "ADD_ONE_SUCCESS", task: data.data });
    
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
    const res = await fetch(`api/edit/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes), 
    });

    if (!res.ok) throw new Error("Update failed");
    
    const data = await res.json();

    dispatch({ type: "UPDATE_ONE_SUCCESS", task: data.data });
    
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
    const res = await fetch(`api/task/del/${id}`, {
      method: "DELETE", 
    });

    if (!res.ok) throw new Error("Delete failed");
    
    dispatch({ type: "DELETE_ONE_SUCCESS", deleted: true });
    
  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}





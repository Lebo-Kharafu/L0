import type { TaskMsg } from "./tasksModel";
import type { Task } from "@/interfaces/Task";

export async function fetchAllTask(
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "FETCH_ALL_REQUEST" });

  try {
    // const res = await fetch(`https://127.0.0.1:9200/data/letsdo/tasks`);
    const res = await fetch(`api/tasks`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    dispatch({ type: "FETCH_ALL_SUCCESS", tasks: data.data });
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
    // const res = await fetch(`https://127.0.0.1:9200/data/letsdo/task/${id}`);
    const res = await fetch(`api/task/${id}`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    dispatch({ type: "FETCH_ONE_SUCCESS", task: data.data });
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
    // const res = await fetch(`https://127.0.0.1:9200/data/letsdo/task/add`, {
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
    // const res = await fetch(`https://127.0.0.1:9200/data/letsdo/task/edit/${id}`, {
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
    // const res = await fetch(`https://127.0.0.1:9200/data/letsdo/task/del/${id}`, {
    const res = await fetch(`api/task/del/${id}`, {
      method: "DELETE", 
    });

    if (!res.ok) throw new Error("Delete failed");
    
    dispatch({ type: "DELETE_ONE_SUCCESS", deleted: true });
    
  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}





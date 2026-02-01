import type { TaskMsg } from "./tasksModel";

export async function fetchTask(
  id: number,
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "FETCH_ONE_REQUEST", id });

  try {
    const res = await fetch(`https://127.0.0.1:9200/data/letsdo/task/${id}`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    dispatch({ type: "FETCH_ONE_SUCCESS", task: data.task });
  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}

export async function fetchAllTask(
  dispatch: (m: TaskMsg) => void
) {
  dispatch({ type: "FETCH_ALL_REQUEST" });

  try {
    const res = await fetch(`https://127.0.0.1:9200/data/letsdo/tasks`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    dispatch({ type: "FETCH_ALL_SUCCESS", tasks: data.tasks });
  } catch (e: any) {
    dispatch({ type: "REQUEST_FAILURE", error: e.message });
  }
}



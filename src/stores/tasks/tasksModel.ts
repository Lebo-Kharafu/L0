import type { Task } from "@/interfaces/Task";

// ? SHOULD I USE THIS OR THE MULTI UNION
export type TaskModel = {
  isLoading: boolean;
  task?: Task | null;
  tasks?: Task[] | null;
  deleted?: boolean;
  error: string | null;
};

export const initialModel: TaskModel = {
  isLoading: false,
  task: null,
  tasks: null,
  error: null,
};

export type taskModelSingle = {
  isLoading: boolean;
  task: Task | null;
  error: string | null;
};

export const initialSingle: taskModelSingle = {
  isLoading: false,
  task: null,
  error: null,
};

export type taskModelArray = {
  isLoading: boolean;
  tasks: Task[] | null;
  error: string | null;
};

export const initialArray: taskModelArray = {
  isLoading: false,
  tasks: null,
  error: null,
};


export type TaskMsg =
  | { type: "FETCH_ONE_REQUEST"; id: number}
  | { type: "FETCH_ONE_SUCCESS"; task: Task }
  | { type: "ADD_ONE_REQUEST"; task: Partial<Task>}
  | { type: "ADD_ONE_SUCCESS"; task: Task }
  | { type: "UPDATE_ONE_REQUEST"; id: number}
  | { type: "UPDATE_ONE_SUCCESS"; task: Task }
  | { type: "DELETE_ONE_REQUEST"; id: number}
  | { type: "DELETE_ONE_SUCCESS"; deleted: boolean }
  | { type: "FETCH_ALL_REQUEST";}
  | { type: "FETCH_ALL_SUCCESS"; tasks: Task[] }
  | { type: "REQUEST_FAILURE"; error: string };
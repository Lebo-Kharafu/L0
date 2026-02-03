import type { Task } from "@/interfaces/Task";
export interface InvertState {
  inverse: string;
  state: any;
}

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

export type TaskMsg =
  | { type: "FETCH_ONE_REQUEST"; id: number}
  | { type: "FETCH_ONE_SUCCESS"; task: Task }
  | { type: "ADD_ONE_REQUEST"; task: Omit<Task,"id">}
  | { type: "ADD_ONE_SUCCESS"; task: Task; history?: InvertState[]; redo?: InvertState[]; }
  | { type: "UPDATE_ONE_REQUEST"; id: number}
  | { type: "UPDATE_ONE_SUCCESS"; task: Task; history?: InvertState[]; redo?: InvertState[]; }
  | { type: "DELETE_ONE_REQUEST"; id: number}
  | { type: "DELETE_ONE_SUCCESS"; id: number; history?: InvertState[]; redo?: InvertState[]; }
  | { type: "FETCH_ALL_REQUEST";}
  | { type: "FETCH_ALL_SUCCESS"; tasks: Task[]; history?: InvertState[]; redo?: InvertState[]; }
  | { type: "RESET_SUCCESS" }
  | { type: "REQUEST_FAILURE"; error: string };
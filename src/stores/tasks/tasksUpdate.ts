import type { TaskModel, TaskMsg } from "./tasksModel";

export function update(model: TaskModel, msg: TaskMsg): TaskModel {
  switch (msg.type) {
    case "FETCH_ONE_REQUEST":
      return { ...model, isLoading: true, error: null };

    case "FETCH_ONE_SUCCESS":
      return { ...model, isLoading: false, task: msg.task };
    
    case "ADD_ONE_REQUEST":
      return { ...model, isLoading: true, error: null };

    case "ADD_ONE_SUCCESS":
      return { ...model, isLoading: false, task: msg.task };
    
    case "UPDATE_ONE_REQUEST":
      return { ...model, isLoading: true, error: null };

    case "UPDATE_ONE_SUCCESS":
      return { 
        ...model, 
        isLoading: false, 
        task: msg.task, 
        tasks: model.tasks?.map(t => t.id === msg.task.id ? msg.task : t) || null
      };

    case "DELETE_ONE_REQUEST":
      return { ...model, isLoading: true, error: null };

    case "DELETE_ONE_SUCCESS":
      return { ...model, isLoading: false, deleted: true };

    case "FETCH_ALL_REQUEST":
      return { ...model, isLoading: true, error: null };

    case "FETCH_ALL_SUCCESS":
      return { ...model, isLoading: false, tasks: msg.tasks  };

    case "REQUEST_FAILURE":
      return { ...model, isLoading: false, error: msg.error };

    default:
      return model;
  }
}
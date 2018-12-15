import * as action_types from './const';

export const addTask = (task) => {
  return {type: action_types.ADD_TASK, task}
}

export const setTasks = (tasks) => {
  return {type: action_types.SET_TASKS, tasks};
}

export const updateTask = (task) => {
  return {type: action_types.UPDATE_TASK, task};
}

export const deleteTask = (task) => {
  return {type: action_types.DELETE_TASK, task};
}


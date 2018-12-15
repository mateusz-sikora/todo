const updateTask = (state, task) => {
  const tasks = [...state.tasks];
  const taskIndex = tasks.findIndex(item => item.id === task.id);

  if (taskIndex === -1){
    return state;
  }
  tasks[taskIndex] = task;
  return {...state, tasks};
}

const deleteTask = (state, task) => {
  const tasks = [...state.tasks];
  const taskIndex = tasks.findIndex(item => item.id === task.id);

  if (taskIndex === -1){
    return state;
  }
  tasks.splice(taskIndex, 1);
  return {...state, tasks};
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'addTask':
      return {...state, tasks: [...state.tasks, action.task]};
    case 'setTasks':
      return {...state, tasks: action.tasks};
    case 'updateTask':
      return updateTask(state, action.task);
    case 'deleteTask':
      return deleteTask(state, action.task);
    default:
      return state;
  }
};

export default reducer;

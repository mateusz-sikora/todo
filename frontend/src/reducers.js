import { List } from 'immutable';

const reducer = (state, action) => {
  switch (action.type) {
    case 'addTask':
      return {
        ...state,
        tasks: state.tasks.push(action.task)
      };
    case 'setTasks':
      return {
        ...state,
        tasks: List(action.tasks)
      };
    case 'updateTask':
      return {
        ...state,
        tasks: state.tasks.set(
          state.tasks.findIndex(item => item.id === action.task.id),
          action.task
        )
      };
    case 'deleteTask':
      return {
        ...state,
        tasks: state.tasks.delete(
          state.tasks.findIndex(item => item.id === action.task.id),
          action.task
        )
      };
    default:
      return state;
  }
};

export default reducer;

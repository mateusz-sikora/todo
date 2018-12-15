import * as action_types from './const';

import { List } from 'immutable';

const reducer = (state, action) => {
  switch (action.type) {
    case action_types.ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.push(action.task)
      };
    case action_types.SET_TASKS:
      return {
        ...state,
        tasks: List(action.tasks)
      };
    case action_types.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.set(
          state.tasks.findIndex(item => item.id === action.task.id),
          action.task
        )
      };
    case action_types.DELETE_TASK:
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

import { Action } from "../actions";

export interface TaskState {
  tasks: {
    title: string;
    description: string;
    status: string;
  }[];
}

const initialState = {
  tasks: [],
};

export const taskReducer = (
  state: TaskState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    case "UPDATE_TASK": {
      const updatedTasks = state.tasks.map((task, index) => {
        if (index === action.payload.index) {
          return { ...task, ...action.payload };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter(
        (_, index) => index !== action.payload.index
      );

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};

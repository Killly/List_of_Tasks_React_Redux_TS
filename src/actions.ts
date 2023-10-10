export type Action = {
  type: "ADD_TASK" | "UPDATE_TASK" | "DELETE_TASK";
  payload: {
    title: string;
    description: string;
    status: string;
    index?: number;
  };
};

export const addTask = (taskData: {
  title: string;
  description: string;
  status: string;
}): Action => ({
  type: "ADD_TASK",
  payload: taskData,
});

export const updateTask = (taskData: {
  title: string;
  description: string;
  status: string;
  index: number;
}): Action => ({
  type: "UPDATE_TASK",
  payload: taskData,
});

export const deleteTaskAction = (index: number): Action => ({
  type: "DELETE_TASK",
  payload: {
    index,
    title: "", // You can set these properties to empty strings or undefined if you want
    description: "",
    status: "",
  },
});

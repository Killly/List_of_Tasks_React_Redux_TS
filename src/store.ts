import { createStore } from "redux";
import { taskReducer } from "./Reducers/TaskReducer";

export const store = createStore(taskReducer);

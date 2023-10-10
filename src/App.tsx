import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { TaskState } from "./Reducers/TaskReducer";
import { useDispatch } from "react-redux";
import { addTask, updateTask, deleteTaskAction } from "./actions"; // Import the updateTask action
import MyModal from "./Components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<
    | {
        index: number;
        task: TaskState["tasks"][0];
      }
    | undefined
  >(undefined);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const tasks = useSelector<TaskState, TaskState["tasks"]>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

  const openModalForEdit = (task: TaskState["tasks"][0]) => {
    const index = tasks.indexOf(task);
    setTaskToEdit({ index, task });
    setShowModal(true);
  };

  const onAddTask = (taskData: {
    title: string;
    description: string;
    status: string;
  }) => {
    dispatch(addTask(taskData));
  };

  const toggleStatus = (index: number) => {
    const updatedTasks = [...tasks];
    const updatedTask = { ...updatedTasks[index] };
    updatedTask.status = updatedTask.status === "Done" ? "" : "Done";
    updatedTasks[index] = updatedTask;

    dispatch(updateTask({ ...updatedTask, index }));
  };

  const deleteTask = (index: number) => {
    dispatch(deleteTaskAction(index));
  };

  const toggleStatusFilter = () => {
    setStatusFilter((prevFilter) => (prevFilter === "Done" ? null : "Done"));
  };

  const filteredTasks = statusFilter
    ? tasks.filter((task) =>
        statusFilter === "Done" ? task.status === "Done" : task.status !== ""
      )
    : tasks;

  return (
    <>
      <div className="mt-5 container-sm text-center">
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={openModal}
            className="btn btn-outline-success"
          >
            Add task
          </button>
          <button
            type="button"
            onClick={toggleStatusFilter}
            className="btn btn-outline-primary"
          >
            {statusFilter === "Done" ? "Show All" : "Filter"}
          </button>
        </div>
        {showModal && (
          <MyModal
            onClose={() => {
              closeModal();
              setTaskToEdit(undefined); // Reset taskToEdit when closing the modal
            }}
            taskToEdit={taskToEdit}
          />
        )}
        <hr />
        <ul className="list-group d-flex flex-column gap-3">
          {filteredTasks.map((task, index) => {
            return (
              <li
                className={`d-flex flex-row gap-10 justify-content-between list-group-item list-group-item-warning ${
                  task.status === "Done" ? "completed-task" : ""
                }`}
                key={index}
              >
                <div className="w-10 p-3">
                  <span className="">{task.title}</span>
                </div>
                <div className="w-50 p-3">
                  <span className=" wrap-text">{task.description}</span>
                </div>
                <div className="w-10 p-3">
                  <span className="">{task.status}</span>
                </div>
                <div className="w-30 p-3">
                  <button onClick={() => toggleStatus(index)} className="btn">
                    {!task.status ? "✔️" : "❌"}
                  </button>
                  <button
                    onClick={() => openModalForEdit(task)}
                    className="btn btn-outline-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="btn btn-outline-primary"
                  >
                    ╳
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;

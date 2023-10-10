import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NewTaskInput from "./NewTaskInput";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../actions";

interface MyModalProps {
  onClose: () => void;
  taskToEdit?: {
    index: number;
    task: {
      title: string;
      description: string;
      status: string;
    };
  };
}

function MyModal({ onClose, taskToEdit }: MyModalProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(taskToEdit?.task.title || "");
  const [description, setDescription] = useState(
    taskToEdit?.task.description || ""
  );
  const [status, setStatus] = useState(taskToEdit?.task.status || "");

  const isEditing = taskToEdit !== undefined;

  const validateTitle = (value: string) => {
    return value.trim() !== "";
  };

  const validateDescription = (value: string) => {
    return value.trim() !== "";
  };

  const validateStatus = (value: string) => {
    return value === "Done" || value === "";
  };

  const validateFields = () => {
    if (!validateTitle(title) || !validateDescription(description)) {
      alert("Please fill the Title and description");
      return false;
    }
    if (!validateStatus(status)) {
      alert("Status should be 'Done' or empty");
      return false;
    }
    return true;
  };

  const handleAddTask = () => {
    dispatch(addTask({ title, description, status }));
    onClose();
  };

  const handleUpdateTask = () => {
    dispatch(
      updateTask({ title, description, status, index: taskToEdit!.index })
    );
    onClose();
  };

  const handleSaveChanges = () => {
    if (validateFields()) {
      if (isEditing) {
        handleUpdateTask();
      } else {
        handleAddTask();
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewTaskInput
          label="Title"
          value={title}
          onChange={setTitle}
          validate={validateTitle}
        />
        <NewTaskInput
          label="Description"
          value={description}
          onChange={setDescription}
          validate={validateDescription}
        />
        {!isEditing && (
          <div className="form-group">
            <label>Status</label>
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Status"
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {isEditing ? "Save Changes" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;

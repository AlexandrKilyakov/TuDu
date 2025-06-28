import { useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TasksList from "./components/TasksList";
import useLocalStorage from "./hooks/useLocalStorage";
import useModal from "./hooks/useModal";

function App() {
  const modal = useModal();
  const storage = useLocalStorage("tasks");
  const [editingTask, setEditingTask] = useState(null);

  const hendlerModalAdd = () => {
    setEditingTask(null);
    modal.setOpen("add");
  };

  const hendlerModalEdit = (task) => {
    setEditingTask(task);
    modal.setOpen("edit");
  };

  return (
    <>
      <Header />
      <Button onClick={hendlerModalAdd}>+</Button>
      <TasksList
        onEdit={hendlerModalEdit}
        storage={{ tasks: storage.tasks, deleteTask: storage.deleteTask }}
      />
      <Modal
        open={modal.open}
        onClose={() => modal.setOpen("")}
        task={editingTask}
        storage={{ addTask: storage.addTask, updateTask: storage.updateTask }}
      />
    </>
  );
}

export default App;

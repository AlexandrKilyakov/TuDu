import { useEffect, useRef } from "react";
import dataStatus from "../../data/dataStatus";
import Button from "../Button";
import Label from "../Label";
import "./ModalTask.scss";

const ModalTask = ({
  onClose,
  role = "add",
  task = null,
  storage = { addTask: () => {}, updateTask: () => {} },
}) => {
  const form = useRef();
  const fieldName = useRef();
  const fieldStatus = useRef();
  const fieldText = useRef();

  role = role == "" ? "add" : role;

  useEffect(() => {
    if (task && role === "edit") {
      fieldName.current.value = task.title;
      fieldText.current.value = task.description;
      fieldStatus.current.value = `${task.status.slug}:${task.status.value}`;
    } else if (role === "add") {
      form.current?.reset();
    }
  }, [role, task]);

  const roles = {
    add: {
      title: "Добавить задание",
      button: "Создать",
      action: () => {
        storage.addTask(
          fieldName.current.value,
          fieldText.current.value,
          fieldStatus.current.value
        );
      },
    },
    edit: {
      title: "Редактировать задание",
      button: "Сохранить",
      action: () => {
        storage.updateTask(task.id, {
          title: fieldName.current.value,
          description: fieldText.current.value,
          status: fieldStatus.current.value,
        });
      },
    },
  };

  const HendlerTask = (event) => {
    const name = fieldName.current.value.trim();
    const text = fieldText.current.value.trim();

    if (name.length && text.length) {
      event.preventDefault();

      roles[role].action();

      onClose();

      form.current.reset();
    }
  };

  return (
    <>
      <h2 className="modal__title">{roles[role].title}</h2>
      <form ref={form} className="task__form">
        <Label label="Название">
          <input
            ref={fieldName}
            type="text"
            className="task__input"
            placeholder="Название задачи"
            name="name"
            required
          />
        </Label>
        <Label label="Статус">
          <select ref={fieldStatus} name="status" className="task__select">
            {Object.entries(dataStatus).map(([index, value]) => (
              <option key={index} value={index + ":" + value}>
                {value}
              </option>
            ))}
          </select>
        </Label>
        <Label label="Описание">
          <textarea
            ref={fieldText}
            className="task__textarea"
            placeholder="Описание задачи..."
            name="text"
            required
          ></textarea>
        </Label>
        <Button onClick={HendlerTask}>{roles[role].button}</Button>
      </form>
    </>
  );
};

export default ModalTask;

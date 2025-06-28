import { useState } from "react";
import dataStatus from "../../data/dataStatus";
import Button from "../Button";
import "./TasksList.scss";

const TasksList = ({
  onEdit,
  storage = { tasks: {}, deleteTask: () => {} },
}) => {
  const [tabButton, setTabButton] = useState(Object.keys(dataStatus)[0]);
  if (!storage.tasks.length) return "";

  return (
    <>
      <ul className="tasks__tabs">
        {Object.entries(dataStatus).map(([index, tab]) => {
          let classTab = "task__tab";

          if (index == tabButton) classTab += " active";

          return (
            <li key={index} className="task__tab_item">
              <Button className={classTab} onClick={() => setTabButton(index)}>
                {tab}
              </Button>
            </li>
          );
        })}
      </ul>
      <ul className="tasks__list">
        {Object.entries(storage.tasks).map(([index, task]) => {
          const classStatus = `task__status status__${task.status.slug}`;

          if (task.status.slug != tabButton) return "";

          return (
            <li key={task.id} className="task__item">
              <h3 className="task__title">{task.title}</h3>
              <p className="task__description">{task.description}</p>
              <span className={classStatus}>{task.status.value}</span>
              <div className="task__actions">
                <Button
                  className="task__button_edit"
                  onClick={() => onEdit(task)}
                >
                  Редактировать
                </Button>
                <Button
                  className="task__button_delete"
                  onClick={() => storage.deleteTask(task.id)}
                >
                  Удалить
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TasksList;

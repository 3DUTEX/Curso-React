import PropTypes from "prop-types";
import { useState } from "react";
import "./TaskItem.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);
  const [editableTitle, setEditableTitle] = useState(title);

  //pegando valor do input e atribuindo a um titulo editável
  const onTitleChange = (e) => {
    const newTitle = e.target.value;

    setEditableTitle(newTitle);

    onTaskUpdate(id, newTitle, taskState);
  };

  //ao pressionar Enter o input volta a ser um texto
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStateChange = (e) => {
    const selectStateValue = e.target.value;

    onTaskUpdate(id, title, selectStateValue);
  };

  //renderização condicional

  //se for true
  if (isEditing) {
    //retorna input
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    //se for false, retorna um texto
    return (
      <div className="task-item">
        <p
          onClick={(e) => {
            setIsEditing(true);
          }}
        >
          {editableTitle}
        </p>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};

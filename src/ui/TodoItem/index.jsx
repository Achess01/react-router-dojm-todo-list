import React from "react";
import { CompleteIcon } from "../TodoIcon/CompleteIcon";
import { DeleteIcon } from "../TodoIcon/DeleteIcon";
import "./TodoItem.css";
import { EditIcon } from "../TodoIcon/EditIcon";

function TodoItem(props) {
  const { onComplete, onDelete, onEdit, completed, text } = props;

  return (
    <li className="TodoItem">
      <CompleteIcon completed={completed} onComplete={onComplete} />
      <p className={`TodoItem-p ${completed && "TodoItem-p--complete"}`}>
        {text}
      </p>
      <EditIcon onEdit={onEdit} />
      <DeleteIcon onDelete={onDelete} />
    </li>
  );
}

export { TodoItem };

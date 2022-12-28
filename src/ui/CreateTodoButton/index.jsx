import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const { onClick } = props;

  return (
    <button className={"CreateTodoButton"} onClick={onClick}>
      +
    </button>
  );
}

export { CreateTodoButton };

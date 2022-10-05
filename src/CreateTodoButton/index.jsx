import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const { setOpenModal, openModal } = props;
  const onClickButton = () => {
    setOpenModal(!openModal);
  };

  return (
    <button
      className={`CreateTodoButton ${!!openModal ? "Opened" : ""}`}
      onClick={onClickButton}
    >
      +
    </button>
  );
}

export { CreateTodoButton };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TodoForm.css";

function TodoForm({ submitEvent, label, submitText, defaultTodoText = "" }) {
  const [newTodoValue, setNewTodoValue] = useState(defaultTodoText);
  const navigate = useNavigate();

  const onChange = (e) => setNewTodoValue(e.target.value);

  const onCancel = () => {
    navigate("/");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submitEvent(newTodoValue);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <label>{label}</label>
      <textarea
        placeholder="Cortar la cebolla para el almuerzo"
        value={newTodoValue}
        onChange={onChange}
        onBlur={onChange}
      />
      <div className="TodoForm-buttonContainer">
        <button
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
          type="button"
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          {submitText}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };

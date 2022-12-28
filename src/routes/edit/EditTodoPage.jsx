import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";

function EditTodoPage() {
  const params = useParams();
  const location = useLocation();
  const id = Number(params.id);
  const { state, stateUpdaters } = useTodos();
  const { editTodo } = stateUpdaters;
  const { loading, getTodo } = state;

  if (loading && !location.state?.todo) {
    return <p>Cargando...</p>;
  }

  const todo = location.state?.todo ? location.state.todo : getTodo(id);

  return (
    <TodoForm
      submitEvent={(newText) => editTodo(id, newText)}
      defaultTodoText={todo.text}
      label="Edita tu TODO"
      submitText="Editar"
    />
  );
}

export { EditTodoPage };

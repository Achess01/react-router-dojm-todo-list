import React from "react";
import { useTodos } from "../useTodos";
import { TodoCounter } from "../../ui/TodoCounter";
import { TodoSearch } from "../../ui/TodoSearch";
import { CreateTodoButton } from "../../ui/CreateTodoButton";
import { TodoList } from "../../ui/TodoList";
import { TodoItem } from "../../ui/TodoItem";
import { Modal } from "../../ui/Modal";
import { TodoForm } from "../../ui/TodoForm";
import { TodoHeader } from "../../ui/TodoHeader";
import { ChangeAlert } from "../../ui/ChangeAlert";

function HomePage() {
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    openModal,
    totalTodos,
    searchValue,
    completedTodos,
  } = state;

  const {
    completeTodo,
    deleteTodo,
    setOpenModal,
    setSearchValue,
    addTodo,
    synchronizeTodos,
  } = stateUpdaters;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>
      <TodoList
        searchText={searchValue}
        totalTodos={totalTodos}
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        onError={() => <p>Hybo un error</p>}
        onLoading={() => <p>Estamos cargando...</p>}
        onEmptyTodos={() => <p>¡Crea tu primer TODO!</p>}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultados para {searchText}</p>
        )}
      >
        {(todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => console.log("editar todo")}
          />
        )}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal} />

      <ChangeAlert synchronize={synchronizeTodos} />
    </React.Fragment>
  );
}

export { HomePage };

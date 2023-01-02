import React from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../useTodos";
import { TodoCounter } from "../../ui/TodoCounter";
import { TodoSearch } from "../../ui/TodoSearch";
import { CreateTodoButton } from "../../ui/CreateTodoButton";
import { TodoList } from "../../ui/TodoList";
import { TodoItem } from "../../ui/TodoItem";
import { TodoHeader } from "../../ui/TodoHeader";
import { ChangeAlert } from "../../ui/ChangeAlert";

function HomePage() {
  const navigate = useNavigate();
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    totalTodos,
    searchValue,
    completedTodos,
    searchParam,
  } = state;

  const {
    completeTodo,
    deleteTodo,
    setSearchValue,
    // addTodo,
    synchronizeTodos,
  } = stateUpdaters;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchParam={searchParam}
        />
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
          <p>No hay resultados para {searchText.get(searchParam)}</p>
        )}
      >
        {(todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => navigate(`/edit/${todo.id}`, { state: { todo } })}
          />
        )}
      </TodoList>

      <CreateTodoButton onClick={() => navigate("/new")} />

      <ChangeAlert synchronize={synchronizeTodos} />
    </React.Fragment>
  );
}

export { HomePage };

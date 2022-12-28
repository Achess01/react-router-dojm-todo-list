import { useState } from "react";
import { useLocalStorage } from "./useLocaleStorage";

function useTodos() {
  const {
    item: todos,
    saveItems: saveTodos,
    loading,
    error,
    synchronizeItem: synchronizeTodos,
  } = useLocalStorage("TODOS_V2", []);

  const [searchValue, setSearchValue] = useState("");
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    }
  };

  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
      const newTodos = [...todos];
      newTodos[todoIndex].text = newText;
      saveTodos(newTodos);
    }
  };
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    }
  };

  const getTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    return todo;
  };

  const addTodo = (text) => {
    const id = newTodoId(todos);
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
      id,
    });
    saveTodos(newTodos);
  };

  const state = {
    error,
    loading,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    getTodo,
  };

  const stateUpdaters = {
    setSearchValue,
    completeTodo,
    deleteTodo,
    addTodo,
    editTodo,
    synchronizeTodos,
  };

  return {
    state,
    stateUpdaters,
  };
}

function newTodoId(todoList) {
  if (!todoList.length) {
    return 1;
  }
  const idList = todoList.map((todo) => todo.id);
  const idMax = Math.max(...idList);

  return idMax + 1;
}

export { useTodos };

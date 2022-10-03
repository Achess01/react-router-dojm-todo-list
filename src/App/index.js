import React, { useState } from "react";
import { AppUI } from "./AppUI";

/* const defaultTodos = [
  { text: "Cortar cebolla", completed: false },
  { text: "Tomar curso de Intro reac", completed: false },
  { text: "Llorar con la llorona", completed: false },
]; */

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItems;
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
  } else {
    parsedItems = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItems);

  const saveItems = (newItems) => {
    const stringifidiedItems = JSON.stringify(newItems);
    localStorage.setItem(itemName, stringifidiedItems);
    setItem(newItems);
  };

  return [item, saveItems];
}

function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);

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

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    if (todoIndex >= 0) {
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    }
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    if (todoIndex >= 0) {
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    }
  };

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;

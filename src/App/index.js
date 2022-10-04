import React from "react";
import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";

/* const defaultTodos = [
  { text: "Cortar cebolla", completed: false },
  { text: "Tomar curso de Intro reac", completed: false },
  { text: "Llorar con la llorona", completed: false },
]; */

function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;

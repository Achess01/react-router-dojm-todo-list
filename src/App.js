import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
// import './App.css';

const todos = [
  {text: 'Cortar cebolla', completed: false },
  {text: 'Tomar curso de Intro reac', completed: false },
  {text: 'Llorar con la llorona', completed: false },
]

function App() {
  return (
    <React.Fragment>
    <TodoCounter />
    
    <TodoSearch />    
    <TodoList>
      {todos.map(todo => (
        <TodoItem key={todo.text} text={todo.text}/>
      ))}
    </TodoList>
    <CreateTodoButton />    
    </React.Fragment>
  );
}

export default App;

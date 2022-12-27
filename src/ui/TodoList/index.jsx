import React from "react";
import "./TodoList.css";

function TodoList(props) {
  return (
    <section className="TodoLIst-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}
      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchText)}
      <ul>{!props.loading && !props.error && props.searchedTodos.map(props.render || props.children)}</ul>
    </section>
  );
}

export { TodoList };

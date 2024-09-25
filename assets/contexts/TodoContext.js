import React, { createContext, useState } from "react";

export const initialContext = {
  todos: [{ name: "meh" }, { name: "muh" }],
  setTodos: () => {},
};

export const TodoContext = createContext(initialContext);

export function TodoContextWrapper(props) {
  const [todos, setTodos] = useState(initialContext.todos);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

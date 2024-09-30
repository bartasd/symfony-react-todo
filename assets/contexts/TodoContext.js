import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const initialContext = {
  todos: [],
  setTodos: () => {},
};

export const TodoContext = createContext(initialContext);

export function TodoContextWrapper(props) {
  const [todos, setTodos] = useState(initialContext.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todo/read");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const initialContext = {
  todos: [],
  setTodos: () => {},
  createTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
};

export const TodoContext = createContext(initialContext);

export function TodoContextWrapper(props) {
  const [todos, setTodos] = useState(initialContext.todos);

  const getTodos = async () => {
    try {
      const response = await axios.get("/api/todo/read");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (todo) => {
    try {
      const response = await axios.post(
        "/api/todo/create",
        JSON.stringify(todo),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (idx) => {
    try {
      const response = await axios.post(
        "/api/todo/delete",
        JSON.stringify({ id: idx }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (idx, newName) => {
    try {
      const response = await axios.post(
        "/api/todo/update",
        JSON.stringify({ id: idx, name: newName }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const value = {
    todos,
    setTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

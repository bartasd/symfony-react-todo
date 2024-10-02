import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const initialContext = {
  todos: [],
  setTodos: () => {},
  createTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  message: "",
  setMessage: () => {},
};

export const TodoContext = createContext(initialContext);

export function TodoContextWrapper(props) {
  const [todos, setTodos] = useState(initialContext.todos);
  const [message, setMessage] = useState("");

  const getTodos = async () => {
    try {
      const response = await axios.get("/api/todo/read");
      setTodos(response.data);
    } catch (error) {
      setMessage(`Error:Error fetching todos.`);
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
      setMessage(`Message:${response.data.message}`);
    } catch (error) {
      setMessage(`Error:Something bad happened creating todo.`);
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
      setMessage(`Message:${response.data.message}`);
    } catch (error) {
      setMessage(`Error:Something bad happened deleting todo.`);
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
      setMessage(`Message:${response.data.message}`);
    } catch (error) {
      setMessage(`Error:Something bad happened updating todo.`);
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
    message,
    setMessage
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

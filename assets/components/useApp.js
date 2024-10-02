import { TodoContext } from "../contexts/TodoContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState, useContext } from "react";

export const useApp = () => {
  const [editing, setEditing] = useState(-1);
  const { todos, createTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  function putTodo(event) {
    event.preventDefault();
    createTodo({ name: addTodo });
    setAddTodo("");
  }

  function handleEditTodo(event) {
    event.preventDefault();
    updateTodo(editing, editTodo);
    setEditTodo("");
    setEditing(-1);
  }

  function confirmDeleteTodo() {
    deleteTodo(todoToDelete);
    cancelDeleteTodo();
  }

  function cancelDeleteTodo() {
    setIsDeleting(false);
    setTodoToDelete(null);
  }

  function handleKeyPressAdd(e) {
    if (e.key === "Enter") {
      putTodo(e);
    }
  }

  function handleKeyPressEdit(e) {
    if (e.key === "Enter") {
      handleEditTodo(e);
    }
  }
  return {
    todos,
    addTodo,
    setAddTodo,
    handleKeyPressAdd,
    putTodo,
    editTodo,
    setEditTodo,
    handleKeyPressEdit,
    handleEditTodo,
    isDeleting,
    setIsDeleting,
    todoToDelete,
    confirmDeleteTodo,
    cancelDeleteTodo,
    editing,
    setEditing,
    setTodoToDelete,
  };
};

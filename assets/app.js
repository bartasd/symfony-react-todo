import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { TodoContext, TodoContextWrapper } from "./contexts/TodoContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import DeleteDialog from "./components/DeleteDialog";

function App() {
  const [editing, setEditing] = useState(-1);
  const { todos, setTodos } = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  function putTodo(event) {
    event.preventDefault();
    setTodos((old) => [...old, { name: addTodo }]);
    setAddTodo("");
  }

  function handleEditTodo(event) {
    event.preventDefault();
    setTodos((old) =>
      old.map((e, i) => (i === editing ? { name: editTodo } : e))
    );
    setEditTodo("");
    setEditing(-1);
  }

  function confirmDeleteTodo() {
    setTodos((old) => old.filter((_, i) => i !== todoToDelete));
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

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                value={addTodo}
                onChange={(e) => setAddTodo(e.target.value)}
                label="New Task"
                fullWidth
                onKeyPress={handleKeyPressAdd}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={putTodo}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {todos.map((todo, idx) => (
            <TableRow key={`todo-${idx}`}>
              <TableCell>
                {editing === idx ? (
                  <TextField
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    fullWidth
                    onKeyPress={handleKeyPressEdit}
                  />
                ) : (
                  todo.name
                )}
              </TableCell>
              <TableCell align="right">
                {editing === idx ? (
                  <IconButton onClick={handleEditTodo}>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        setEditTodo(todo.name);
                        setEditing(idx);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsDeleting(true);
                        setTodoToDelete(idx);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteDialog
        open={isDeleting}
        task={todos[todoToDelete]?.name}
        onCancel={cancelDeleteTodo}
        onConfirm={confirmDeleteTodo}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoContextWrapper>
      <App />
    </TodoContextWrapper>
  </React.StrictMode>
);

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

function App() {
  const [editing, setEditing] = useState(-1);
  const { todos, setTodos } = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");

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

  function deleteTodo(idx) {
    setTodos((old) => old.filter((_, i) => i !== idx));
  }

  return (
    <form onSubmit={putTodo}>
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
              />
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
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
                    <IconButton onClick={() => deleteTodo(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
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

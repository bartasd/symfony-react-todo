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

function App() {
  const { todos, setTodos } = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  function putTodo(event) {
    event.preventDefault();
    setTodos((old) => [...old, { name: addTodo }]);
    setAddTodo("");
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
                fullWidth={true}
              ></TextField>
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {todos.map((todo, idx) => (
            <TableRow key={`todo: ${idx}`}>
              <TableCell>{todo.name}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
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

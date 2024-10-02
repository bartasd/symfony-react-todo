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
import DeleteDialog from "./DeleteDialog";
import { useApp } from "./useApp";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

export default function App() {
  const {
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
    message,
    setMessage
  } = useApp();


  useEffect(() => {

    const [type, msg] = message.split(':');
    if(type == "Message"){
      toast.success(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
    else{
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
  }, [message]);


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
                {editing === todo.id ? (
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
                {editing === todo.id ? (
                  <IconButton onClick={handleEditTodo}>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        setEditTodo(todo.name);
                        setEditing(todo.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsDeleting(true);
                        setTodoToDelete(todo.id);
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

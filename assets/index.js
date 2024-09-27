import ReactDOM from "react-dom/client";
import { TodoContextWrapper } from "./contexts/TodoContext";
import App from "./components/app";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoContextWrapper>
      <App />
    </TodoContextWrapper>
  </React.StrictMode>
);

// todos: useRef were possible..

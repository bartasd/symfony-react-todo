import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { TodoContext, TodoContextWrapper } from "./contexts/TodoContext";

function App() {
  const { someNumber, setSomeNumber } = useContext(TodoContext);

  return (
    <div>
      <p>SOME VALUE: {someNumber}</p>
      <div
        onClick={() => setSomeNumber(someNumber + 5)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        INCREASE BY 5
      </div>
      <div
        onClick={() => setSomeNumber(someNumber - 5)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        DECREASE BY 5
      </div>
      <div
        onClick={() => setSomeNumber(0)}
        style={{ cursor: "pointer", color: "red" }}
      >
        RESET
      </div>
    </div>
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

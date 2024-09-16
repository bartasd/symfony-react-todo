import React, { createContext, useState } from "react";

export const initialContext = {
  someNumber: 0,
  setSomeNumber: () => {},
};

export const TodoContext = createContext(initialContext);

export function TodoContextWrapper(props) {
  const [someNumber, setSomeNumber] = useState(initialContext.someNumber);

  const value = {
    someNumber,
    setSomeNumber,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

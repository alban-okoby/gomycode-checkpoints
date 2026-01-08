import React, { useState } from "react";
import Counter from "./Counter";
import Greeting from "./Greeting";

function App() {
  const [name, setName] = useState("Alban");

  return (
    <div>
      <Greeting name={name} />
      <Counter />
    </div>
  );
}

export default App;

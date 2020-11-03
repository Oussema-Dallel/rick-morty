import "./App.scss";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import { useState } from "react";

function App() {
  const [title] = useState("Rick & Morty");
  return (
    <div className="App">
      <Header title={title} />
      <Container />
    </div>
  );
}

export default App;

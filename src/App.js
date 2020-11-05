import "./App.scss";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import { useState } from "react";

function App() {
  const [title] = useState("Rick & Morty");
  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <Header title={title} setFilter={(e) => setFilter(e.target.value)} />
      <Container filter={filter} />
    </div>
  );
}

export default App;

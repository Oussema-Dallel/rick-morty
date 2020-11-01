import "./App.scss";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title] = useState("Rick & Morty");

  return (
    <div className="App">
      <Header title={title} />
      <Container />
      {/*<Footer title={title} />*/}
    </div>
  );
}

export default App;

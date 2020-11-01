import "./App.css";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("Rick & Morty");
  const [data, setData] = useState([]);

  useEffect(() => {
    /*axios
      .get("https://rickandmortyapi.com/api/character/")
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));*/
    axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
          query {
            characters (page: 1){
              results {
                name
                image
                status
                id
                gender
                species
                episode{
                  id
                  name
                  episode
                }
              }
            }
          }
            `,
      },
    }).then((result) => {
      setData(result.data.data.characters.results);
    });
  }, []);

  return (
    <div className="App">
      <Header title={title} />
      <Container data={data} />
      <Footer title={title} />
    </div>
  );
}

export default App;

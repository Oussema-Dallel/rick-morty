import "./Container.scss";
import { useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faMars,
  faVenus,
  faGenderless,
} from "@fortawesome/free-solid-svg-icons";
import { Card, ListGroup, ListGroupItem, CardColumns } from "react-bootstrap";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Container() {
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(21);

  useEffect(() => {
    axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
          query {
            
            characters (page: ${currentPage}){
              info {
                count
              }
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
      setCurrentPage(currentPage + 1);
    });
  }, []);

  const getStatusClassName = (status) => {
    let statusClassName;
    switch (status) {
      case "Alive":
        statusClassName = "status-alive";
        break;
      case "Dead":
        statusClassName = "status-dead";
        break;
      default:
        statusClassName = "status-unkown";
        break;
    }
    return statusClassName;
  };
  const getGenderIcon = (gender) => {
    let genderIcon;
    switch (gender) {
      case "Male":
        genderIcon = faMars;
        break;
      case "Female":
        genderIcon = faVenus;
        break;
      default:
        genderIcon = faGenderless;
        break;
    }
    return genderIcon;
  };

  const showMore = () => {
    console.log("test");

    if (data.length < 671) {
      axios({
        url: "https://rickandmortyapi.com/graphql",
        method: "post",
        data: {
          query: `
            query {
              
              characters (page: ${currentPage}){
                info {
                  count
                }
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
        setData([...data, ...result.data.data.characters.results]);
        setCurrentPage(currentPage + 1);
      });
    }
  };

  /*axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
            query {
              
              characters (page: ${currentPage}){
                info {
                  count
                }
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
      setData([...data, ...result.data.data.characters.results]);
      setCurrentPage(currentPage + 1);
    });
  }, [currentPage, data]);*/

  return (
    <div className="mt-5">
      <CardColumns>
        <InfiniteScroll
          hasMore={true}
          next={() => showMore()}
          dataLength={671}
          loader={<h4>Loading...</h4>}
        >
          {data.map((d, i) => (
            <div key={i}>
              <Card style={{ width: "18rem" }}>
                <div className="card-avatar">
                  <a href="#" className="details">
                    <span>
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </a>
                  <Card.Img variant="top" src={d.image} />
                </div>
                <Card.Body>
                  <Card.Title className={getStatusClassName(d.status)}>
                    {d.name}
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <strong>Species: </strong>
                    {d.species}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Gender: </strong>
                    <FontAwesomeIcon icon={getGenderIcon(d.gender)} />
                  </ListGroupItem>
                  {/*<ListGroupItem>
                    <strong>First seen in: </strong>
                    {d.episode[0].name} ({d.episode[0].episode})
                  </ListGroupItem>*/}
                </ListGroup>
              </Card>
            </div>
          ))}
        </InfiniteScroll>
      </CardColumns>
    </div>
  );
}

export default Container;

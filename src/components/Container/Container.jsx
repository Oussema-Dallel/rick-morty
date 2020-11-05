import "./Container.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faMars, faVenus, faGenderless, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from "react";

import axios from "axios";

import {
  Card,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Container,
  Modal,
  Button
} from "react-bootstrap";

function Body() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentCaracter, setCurrentCaracter] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e, id) => {
    setLoading(true)
    axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
        query {
          character(id: ${id}) {
           name
           status
           species
           type
           origin {
             name
             dimension
             type
           }
           location {
             name
             type
             dimension
           }
           episode{
               name
               air_date
               episode
            }
         }
       }
      `,
      },
    }).then((result) => {
      setCurrentCaracter(result.data.data.character);
      setShow(true)
    });
  };
  
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
    return genderIcon
  }
  const loadFunc = () => {
    axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
          query {
            characters (page: ${page}){
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
      if(result.data.data.characters.results.length === 0) {
        setHasMore(false)
      }
      setData([...data, ...result.data.data.characters.results]);
      setPage(page + 1);
    });
  }

  
  return (
    <div className="mt-5">
      <Container fluid>
      <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
      >
       <Row xs={1} md={2} lg={3} xl={4}>
            {data.map((d, i) => (
              <Col key={d.id}>
                <Card style={{ width: "18rem" }}>
                  <div className="card-avatar">
                    <Button onClick={(e) => handleShow(e, d.id)} className="details">
                      { 
                        loading ? 
                        <span><FontAwesomeIcon icon={faCircleNotch} spin /></span>
                        :
                        <span><FontAwesomeIcon icon={faInfoCircle} /></span>
                      }
                    </Button>
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
                    <ListGroupItem>
                      <strong>First seen in: </strong>
                      {d.episode[0].name} ({d.episode[0].episode})
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            ))}
           </Row>
        </InfiniteScroll>
        </Container>
        <Modal show={show} onHide={handleClose} onEntered={() => setLoading(false)} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>{currentCaracter.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
               <Container fluid>
                    <Row>
                    { currentCaracter.origin ? 
                      <Col>
                        <Card
                          bg="light"
                        >
                          <Card.Body>
                            <Card.Title>Origin</Card.Title>
                            <Card.Text>
                                {currentCaracter.origin.name ? currentCaracter.origin.name + " " : ""}
                                {currentCaracter.origin.type ? "(Type: " + currentCaracter.origin.type  + ") " : ""}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                        : null}
                      { currentCaracter.location ? 
                      <Col>
                        <Card
                          bg="light"
                        >
                          <Card.Body>
                            <Card.Title>Current Location</Card.Title>
                            <Card.Text>
                              {currentCaracter.location.name ? currentCaracter.location.name + " " : ""}
                              {currentCaracter.location.type ? "(Type: " + currentCaracter.location.type  + ") " : ""}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                        : null}
                    </Row>
                    <Row>
                    { currentCaracter.episode ? 
                      currentCaracter.episode.map((episode) => (
                        <Col key={episode.id}>
                        <Card
                          bg="light"
                        >
                          <Card.Body>
                            <Card.Text>
                              {episode.episode ? episode.episode + " " : ""}
                              {episode.name ? "( " + episode.name + ") " : ""}
                              {episode.air_date ? episode.air_date : ""}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      )) : null}
                      
                    </Row>
              </Container>       

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Body;

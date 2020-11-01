import "./Container.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faMars, faVenus, faGenderless} from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  ListGroup,
  ListGroupItem,
  CardColumns,
} from "react-bootstrap";

function Container({ data }) {
  const getStatusClassName = (status) => {
    let statusClassName;
    switch (status) {
      case "Alive":
        statusClassName = "status-alive"
        break;
      case "Dead":
        statusClassName = "status-dead"
        break;
      default:
        statusClassName = "status-unkown" 
        break;
    }
    return statusClassName
  }
  const getGenderIcon = (gender) => {
    let genderIcon;
    switch (gender) {
      case "Male":
        genderIcon = faMars
        break;
      case "Female":
        genderIcon = faVenus
        break;
      default:
        genderIcon = faGenderless
        break;
    }
    return genderIcon
  }
  return (
    <div className="mt-5">
      <CardColumns>
        {data.map((d, i) => (
          <div key={d.id}>
            <Card style={{ width: "18rem" }}>
              <div className="card-avatar">
                <a href="#" className="details"><span><FontAwesomeIcon icon={faInfoCircle} /></span></a>
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
          </div>
        ))}
      </CardColumns>
    </div>
  );
}

export default Container;

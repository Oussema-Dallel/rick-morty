import "./Container.css";
import {
  Card,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Badge,
} from "react-bootstrap";

function Container({ data }) {
  return (
    <div className="mt-5">
      <CardColumns>
        {data.map((d, i) => (
          <div style={{ color: "black" }} key={d.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={d.image} />
              <Card.Body>
                <Card.Title>
                  {d.name}{" "}
                  <Badge
                    variant={
                      d.status === "Alive"
                        ? "success"
                        : d.status === "Dead"
                        ? "danger"
                        : "dark"
                    }
                  >
                    {d.status}
                  </Badge>
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <strong>Species: </strong>
                  {d.species}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Gender: </strong>
                  {d.gender}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>First seen in: </strong>
                  {d.episode[0].name} ({d.episode[0].episode})
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardColumns>
    </div>
  );
}

export default Container;

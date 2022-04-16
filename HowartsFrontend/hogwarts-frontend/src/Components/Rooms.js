import React, { useContext, useState } from "react";
import { ListGroup, Card, Container, Form, Button, Collapse } from "react-bootstrap";
import { RoomsContext, AddRoom, DeleteRoom } from "../DAL/ContextProviders/RoomsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function Rooms() {
  const { rooms, setRooms } = useContext(RoomsContext);
  const [open, setOpen] = useState(null);

  const formHandler = (event, capacity) => {
    event.preventDefault();
    AddRoom(rooms, setRooms, capacity).then(() => event.target.reset());
  };

  return (
    <header className="App-header">
      <Container className="d-flex flex-row flex-wrap justify-content-center m-0">
        {rooms.map((room) => (
          <Card bg="primary" key={room.id} text="light" style={{ width: "18rem" }} className="mb-2 p-2 m-2">
            <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
              <div className="card-title">{`Room: ${room.id}`}</div>
              <i className="deleteBtn" onClick={() => DeleteRoom(rooms, setRooms, room.id)}>
                <FontAwesomeIcon icon={faTrash} size="1x" />
              </i>
            </Card.Header>
            <Card.Body>
              <Card.Title className="d-flex flex-nowrap justify-content-between flex-row p-2">
                {room.residents.length > 0
                  ? `Students(${room.residents.length}/${room.capacity}):`
                  : "Nobody lives here"}
                <i
                  title={open === room.id ? "Click to close the student list" : "Click to open the student list"}
                  className="infoBtn"
                  onClick={() => setOpen(open === room.id ? null : room.id)}
                  hidden={room.residents.length < 1 ? true : false}
                >
                  <FontAwesomeIcon icon={open === room.id ? faAngleUp : faAngleDown} size="1x" />
                </i>
                <Collapse in={open === room.id} className="ingredients">
                  <ListGroup>
                    {room.residents.map((student) => (
                      <ListGroup.Item key={student.name}>{student.name}</ListGroup.Item>
                    ))}
                    <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                      <i title="Click to close the student list" className="infoBtn" onClick={() => setOpen(null)}>
                        <FontAwesomeIcon icon={faAngleUp} size="1x" />
                      </i>
                    </ListGroup.Item>
                  </ListGroup>
                </Collapse>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
        <Card bg="info" key="Add-Room" text="light" style={{ width: "18rem" }} className="mb-2 p-2 m-2">
          <Card.Header>Add new room:</Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => formHandler(e, e.target[0].value)}>
              <Form.Group className="mb-3">
                <Form.Control
                  required
                  min="1"
                  max="8"
                  size="lg"
                  type="number"
                  id="RoomCapacity"
                  placeholder="Room capacity"
                />
              </Form.Group>
              <Button variant="danger" type="submit">
                Add room
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </header>
  );
}

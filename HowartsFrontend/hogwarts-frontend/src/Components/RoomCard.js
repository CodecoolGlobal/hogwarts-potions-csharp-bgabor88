import React, { useState, useContext } from "react";
import StudentModal from "./StudentModal";
import { RoomsContext } from "../DAL/ContextProviders/RoomsContext";
import { Card, Collapse, ListGroup } from "react-bootstrap";
import { DeleteRoom } from "../DAL/ContextProviders/RoomsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function RoomCard(props) {
  const { rooms, setRooms } = useContext(RoomsContext);
  const [open, setOpen] = useState(null);
  const room = props.room;

  return (
    <Card bg="primary" key={room.id} text="light" style={{ width: "25rem" }} className="mb-2 p-2 m-2">
      <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
        <div className="card-title">{`Room: ${room.id}`}</div>
        <i className="deleteBtn" onClick={() => DeleteRoom(rooms, setRooms, room.id)}>
          <FontAwesomeIcon icon={faTrash} size="1x" />
        </i>
      </Card.Header>
      <Card.Body>
        <Card.Title className="d-flex flex-nowrap justify-content-between flex-row p-2">
          {room.residents.length > 0 ? `Students(${room.residents.length}/${room.capacity}):` : "Nobody lives here"}
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
                <ListGroup.Item key={student.id}>
                  <StudentModal student={student} />
                </ListGroup.Item>
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
  );
}

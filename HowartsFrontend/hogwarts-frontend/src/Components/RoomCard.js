import React, { useState, useContext } from "react";
import StudentModal from "./StudentModal";
import { Card, Collapse, ListGroup } from "react-bootstrap";
import { DeleteRoom, RoomsContext } from "../DAL/ContextProviders/RoomsContext";
import { StudentsContext, AddToRoom, LeaveRoom } from "../DAL/ContextProviders/StudentContext";
import { stateUpdater } from "../Utils/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleUp, faAngleDown, faPlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function RoomCard(props) {
  const { rooms, setRooms } = useContext(RoomsContext);
  const { students, setStudents } = useContext(StudentsContext);
  const [open, setOpen] = useState(null);
  const [addStudent, setAddStudent] = useState(false);
  const room = props.room;
  const studentsWithoutRoom = students.filter((student) => student.room === null);
  const isDisabledBtn = room.capacity === room.residents.length || studentsWithoutRoom.length === 0;

  return (
    <Card bg="primary" key={room.id} text="light" style={{ width: "25rem" }} className="mb-2 p-2 m-2">
      <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
        <div className="card-title">{`Room: ${room.id}`}</div>
        <div>
          <Collapse in={addStudent} className="ingredients">
            <ListGroup>
              {studentsWithoutRoom.map((student) => (
                <ListGroup.Item
                  className="hover"
                  key={student.id}
                  onClick={() => {
                    AddToRoom(student.id, room.id, setStudents, setRooms);
                    setAddStudent(!addStudent);
                  }}
                >
                  {student.name}
                </ListGroup.Item>
              ))}
              <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                <FontAwesomeIcon
                  title="Click to close!"
                  className="infoBtn"
                  onClick={() => setAddStudent(!addStudent)}
                  icon={faAngleUp}
                  size="1x"
                />
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
          <FontAwesomeIcon
            title="Click to move a student in!"
            className={`${isDisabledBtn ? "disabled" : ""} deleteBtn pr-3`}
            onClick={() => setAddStudent(!addStudent)}
            icon={faPlus}
            size="1x"
          />
          <FontAwesomeIcon
            className="deleteBtn"
            onClick={() => DeleteRoom(rooms, setRooms, room.id)}
            icon={faTrash}
            size="1x"
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="d-flex flex-nowrap justify-content-between flex-row p-2">
          {room.residents.length > 0 ? `Students(${room.residents.length}/${room.capacity}):` : "Nobody lives here"}
          <FontAwesomeIcon
            title={open === room.id ? "Click to close the student list" : "Click to open the student list"}
            className="infoBtn"
            onClick={() => setOpen(open === room.id ? null : room.id)}
            hidden={room.residents.length < 1 ? true : false}
            icon={open === room.id ? faAngleUp : faAngleDown}
            size="1x"
          />
          <Collapse in={open === room.id} className="ingredients">
            <ListGroup>
              {room.residents.map((student) => (
                <ListGroup.Item
                  key={student.id}
                  className="d-flex flex-row flex-nowrap justify-content-between align-itmes-center"
                >
                  <StudentModal student={student} />
                  <FontAwesomeIcon
                    className="p-2 hover"
                    onClick={() => {
                      LeaveRoom(student.id, room.id, setStudents, setRooms);
                      setOpen(null);
                    }}
                    icon={faCircleMinus}
                    size="1x"
                  />
                </ListGroup.Item>
              ))}
              <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                <FontAwesomeIcon
                  title="Click to close!"
                  className="infoBtn"
                  onClick={() => setOpen(null)}
                  icon={faAngleUp}
                  size="1x"
                />
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

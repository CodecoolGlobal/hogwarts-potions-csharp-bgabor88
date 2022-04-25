import React, { useState } from "react";
import StudentData from "./StudentData";
import { Modal, Card } from "react-bootstrap";

export default function StudentModal(props) {
  const [show, setShow] = useState(false);
  const student = props.student;

  return (
    <>
      <div className="listBtn p-2" onClick={() => setShow(true)}>
        {student.name}
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{student.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            bg="info"
            key={student.id}
            text="dark"
            className="d-flex flex-nowrap justify-content-center flex-column m-2"
          >
            <Card.Body>
              <StudentData student={student} />
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

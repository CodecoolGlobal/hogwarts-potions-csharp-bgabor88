import React, { useContext, useState } from "react";
// import { useLocation } from "react-router-dom";
import StudentData from "./StudentData";
import { RegisterStudent } from "../DAL/RegistrationComponents";
import { StudentsContext, DeleteStudent } from "../DAL/ContextProviders/StudentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Students(props) {
  const { students, setStudents } = useContext(StudentsContext);
  const [selected, setSelected] = useState([]);

  const Content = () => {
    if (selected.length === 0) {
      return (
        <Card
          bg="info"
          key="empty-student"
          text="dark"
          className="d-flex flex-nowrap justify-content-center flex-column m-2"
        >
          <Card.Header className="d-flex flex-nowrap justify-content-center flex-row">
            <p>Choose a student to inspect!</p>
          </Card.Header>
        </Card>
      );
    }
    const student = selected[0];
    return (
      <Card
        bg="info"
        key={selected[0].id}
        text="dark"
        className="d-flex flex-nowrap justify-content-center flex-column m-2"
      >
        <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
          <div className="card-title">{`${student.name}`}</div>
          <i
            className="deleteBtn"
            onClick={() => {
              DeleteStudent(students, setStudents, student.id);
              setSelected([]);
            }}
          >
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </i>
        </Card.Header>
        <StudentData student={student} />
      </Card>
    );
  };

  return (
    <div className="container row d-flex flex-row justify-content-center flex-nowrap">
      <div className="col-auto">
        <Card bg="info" key="Select-ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
          <Card.Body className="p-0">
            <Form.Group>
              <Form.Label>Students:</Form.Label>
              <Typeahead
                id="students"
                size="lg"
                labelKey="name"
                onChange={setSelected}
                options={students}
                placeholder="Choose a student..."
                selected={selected}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <RegisterStudent setter={setSelected} />
      </div>
      <div className="col">
        <Content />
      </div>
    </div>
  );
}

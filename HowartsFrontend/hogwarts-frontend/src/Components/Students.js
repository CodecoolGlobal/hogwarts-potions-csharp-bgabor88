import React, { useContext, useState } from "react";
import StudentData from "./StudentData";
import { StudentsContext } from "../DAL/ContextProviders/StudentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useStudentActions } from "../_actions/student.actions";
import { history } from "../_helpers/history";

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);
  const [selected, setSelected] = useState([]);
  const studentActions = useStudentActions();
  history.push("/Students");

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
            <p className="mb-0">Choose a student to inspect!</p>
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
        <Card.Header className="mb-0 d-flex flex-nowrap justify-content-between flex-row">
          <div className="card-title">{`${student.name}`}</div>
          <FontAwesomeIcon
            className="hover deleteBtn"
            onClick={() => {
              studentActions.remove(student.id, setStudents);
              setSelected([]);
            }}
            icon={faTrash}
            size="1x"
          />
        </Card.Header>
        <StudentData student={student} />
      </Card>
    );
  };

  return (
    <div className="container row d-flex flex-row justify-content-center flex-nowrap">
      <div className="col-auto">
        <Card bg="info" key="Select-ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
          Students:
          <Typeahead
            id="st-lst"
            size="lg"
            labelKey="name"
            onChange={setSelected}
            options={students}
            placeholder="Choose a student..."
            selected={selected}
          />
        </Card>
      </div>
      <div className="col">
        <Content />
      </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { StudentsContext, AddStudent, DeleteStudent } from "../DAL/ContextProviders/StudentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Card, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Students() {
  const { students, setStudents } = useContext(StudentsContext);
  const houseTypes = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const petTypes = ["None", "Cat", "Rat", "Owl"];
  const [selected, setSelected] = useState([]);

  const formHandler = async (event) => {
    event.preventDefault();
    const userData = {
      name: event.target[0].value,
      houseType: houseTypes.indexOf(event.target[1].value),
      petType: petTypes.indexOf(event.target[2].value),
    };
    await AddStudent(students, setStudents, userData).then((student) => {
      event.target.reset();
      setSelected([student]);
    });
  };

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
        <Card.Body>
          <Card.Text className="small">{`Potions: ${student.potions.length}`}</Card.Text>
          <Card.Text>{`Recipes: ${student.recipes.length}`}</Card.Text>
          <Card.Text>{`House: ${houseTypes[student.houseType]}`}</Card.Text>
          <Card.Text>{`Pet: ${petTypes[student.petType]}`}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <header className="App-header">
      <div className="container">
        <div className="row d-flex flex-row justify-content-center flex-nowrap">
          <div className="col-auto">
            <Card bg="info" key="Select-ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
              <Card.Body className="p-0">
                <Form.Group>
                  <Form.Label>Students:</Form.Label>
                  <Typeahead
                    id="ingredient-list"
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

            <Card bg="info" key="Add-Student" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
              <Card.Body className="p-0">
                <Form.Label>Add new:</Form.Label>
                <Form onSubmit={(e) => formHandler(e)}>
                  <Form.Group className="mb-3">
                    <Form.Control required min="2" size="sm" type="text" id="studentName" placeholder="Student name" />
                    <Form.Select required size="sm">
                      <option key="defaultHouse" value="" hidden default>
                        Choose House type
                      </option>
                      {houseTypes.map((house) => (
                        <option key={houseTypes.indexOf(house)}>{house}</option>
                      ))}
                    </Form.Select>
                    <Form.Select required size="sm">
                      <option key="defaultPet" value="" hidden default>
                        Choose Pet type
                      </option>
                      {petTypes.map((pet) => (
                        <option key={petTypes.indexOf(pet)}>{pet}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Add student
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Content />
          </div>
        </div>
      </div>
    </header>
  );
}

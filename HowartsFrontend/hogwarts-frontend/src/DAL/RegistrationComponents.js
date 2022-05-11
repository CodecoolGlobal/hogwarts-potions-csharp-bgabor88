import React, { useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { RoomsContext } from "../DAL/ContextProviders/RoomsContext";
import { StudentsContext, AddStudent } from "../DAL/ContextProviders/StudentContext";
import { IngredientsContext, AddIngredient } from "../DAL/ContextProviders/IngredientsContext";
import { useRoomActions } from "../_actions/room.actions";

export function RegisterRoom() {
  const { setRooms } = useContext(RoomsContext);
  const roomActions = useRoomActions();

  const formHandler = (event, capacity) => {
    event.preventDefault();
    roomActions.add(capacity, setRooms);
    event.target.reset();
  };

  return (
    <Card bg="info" key="Add-Room" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
      <Card.Body className="p-0">
        <Form.Label>Add new room:</Form.Label>
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
  );
}

export function RegisterStudent(props) {
  const { setStudents } = useContext(StudentsContext);
  const houseTypes = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const petTypes = ["None", "Cat", "Rat", "Owl"];

  const formHandler = async (event) => {
    event.preventDefault();
    const userData = {
      name: event.target[0].value,
      password: event.target[1].value,
      houseType: houseTypes.indexOf(event.target[2].value),
      petType: petTypes.indexOf(event.target[3].value),
    };
    await AddStudent(setStudents, userData).then((student) => {
      event.target.reset();
      props.setShow(show => !show);
      props.setLogin(login => !login);
    });
  };

  return (
    <Card bg="info" key="Add-Student" text="dark" style={{ width: "100%" }} className="p-2 mt-2">
      <Card.Body className="p-0">
        <Form onSubmit={(e) => formHandler(e)}>
          <Form.Group className="mb-3">
            <Form.Control required min="2" size="sm" type="text" id="studentName" placeholder="Student name" />
            <Form.Control required min="6" size="sm" type="password" id="studentPass" placeholder="Password" />
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
  );
}

export function RegisterIngredient() {
  const { setIngredients } = useContext(IngredientsContext);

  const formHandler = (event) => {
    event.preventDefault();
    const ingredientData = {
      name: event.target[0].value,
    };
    AddIngredient(setIngredients, ingredientData).then(() => event.target.reset());
  };

  return (
    <Card bg="info" key="Add-Ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
      <Card.Body className="mb-3">
        <Form onSubmit={(e) => formHandler(e, e.target[0].value)}>
          <Form.Label>Add new:</Form.Label>
          <Form.Group className="pt-1">
            <Form.Control required min="2" size="lg" type="text" id="ingredientName" placeholder="Ingredient Name" />
          </Form.Group>
          <Button variant="danger" type="submit" className="mt-2 mb-0 p-2">
            Add ingredient
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

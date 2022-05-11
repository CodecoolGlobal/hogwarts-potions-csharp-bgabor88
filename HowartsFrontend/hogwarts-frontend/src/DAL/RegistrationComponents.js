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
};

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

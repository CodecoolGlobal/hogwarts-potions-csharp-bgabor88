import React, { useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { LoginStudent, StudentsContext } from "./ContextProviders/StudentContext"

export default function LoginArea(props) {
  const { login, setLogin } = useContext(StudentsContext);

  const formHandler = async (event) => {
    event.preventDefault();
    const userData = {
      name: event.target[0].value,
      password: event.target[1].value
    };
    await LoginStudent(setLogin, userData).then((student) => {
      event.target.reset();
      props.setLoginData(true);
    });
  };

  return (
    <Card bg="info" key="Login-Student" text="dark" style={{ width: "100%" }} className="p-2 mt-2">
      <Card.Body className="p-0">
        <Form onSubmit={(e) => formHandler(e)}>
          <Form.Group className="mb-3">
            <Form.Control required min="2" size="sm" type="text" id="studentName" placeholder="Student name" />
            <Form.Control required min="6" size="sm" type="password" id="studentPass" placeholder="Password" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

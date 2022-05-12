import { Card, Form, Button } from "react-bootstrap";
import { useAuthActions } from "../../_actions/auth.actions";

export function RegisterStudent(props) {
    const authActions = useAuthActions();
    const houseTypes = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
    const petTypes = ["None", "Cat", "Rat", "Owl"];
  
    const formHandler = async (event) => {
      event.preventDefault();
      const userData = {
        email: event.target[0].value,
        password: event.target[1].value,
        houseType: houseTypes.indexOf(event.target[2].value),
        petType: petTypes.indexOf(event.target[3].value),
      };
      await authActions.register(userData).then(() => {
        props.setShow(show => !show);
        props.setLogin(login => !login);
      });
    };
  
    return (
      <Card bg="info" key="Add-Student" text="dark" style={{ width: "100%" }} className="p-2 mt-2">
        <Card.Body className="p-0">
          <Form onSubmit={(e) => formHandler(e)}>
            <Form.Group className="mb-3">
              <Form.Control required min="2" size="sm" type="text" id="studentName" placeholder="Student e-Mail" />
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
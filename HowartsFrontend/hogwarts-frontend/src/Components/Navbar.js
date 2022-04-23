import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Navigation, Container, Nav, Dropdown, Button } from "react-bootstrap";

function Navbar(props) {
  const Buttons = ["Rooms", "Students"];

  return (
    <Navigation bg="dark" variant="dark">
      <Container>
        <Navigation.Brand>Hogwarts</Navigation.Brand>
        <Nav activeKey={props.getActive} className="me-auto">
          {Buttons.map((button) => (
            <Link to={button} key={Buttons.indexOf(button)}>
              <button
                type="button"
                className={`navBtn p-2 m-2 mt-0 mb-0 btn ${
                  props.getActive === button ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={() => props.setActive(button)}
              >
                {button}
              </button>
            </Link>
          ))}
          <Dropdown>
            <Dropdown.Toggle className="navBtn p-2 m-2 mt-0 mb-0" variant="outline-warning" id="dropdown-basic">
              Catalogue
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item>
                <Link to="Recipes">
                  <button type="button" className="navBtn mt-1 mb-1 btn btn-outline-warning">
                    Recipes
                  </button>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="Ingredients">
                  <button type="button" className="navBtn mt-1 mb-1 btn btn-outline-warning">
                    Ingredients
                  </button>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navigation>
  );
}

export default Navbar;

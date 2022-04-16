import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import NavBar from "react-bootstrap/Navbar";

function Navbar(props) {
  const Buttons = ["Rooms", "Students", "Potions", "Recipes", "Ingredients"];

  return (
    <>
      <NavBar fixed="top" bg="dark" variant="dark">
        <Container>
          <NavBar.Brand>Hogwarts</NavBar.Brand>
          <Nav activeKey={props.getActive} className="me-auto">
            {Buttons.map((button) => (
              <Link to={button} key={Buttons.indexOf(button)}>
                <button
                  type="button"
                  className={`navBtn p-2 m-2 mt-0 mb-0 btn ${
                    props.getActive === button
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => props.setActive(button)}
                >
                  {button}
                </button>
              </Link>
            ))}
          </Nav>
        </Container>
      </NavBar>
    </>
  );
}

export default Navbar;

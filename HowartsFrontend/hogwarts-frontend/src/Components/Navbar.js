import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar as Navigation, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import RegistrationModal from "./RegistrationModal";
import { StudentsContext } from "../DAL/ContextProviders/StudentContext";
import LoginModal from "./LoginModal";

function Navbar(props) {
  const Buttons = ["Rooms", "Students"];
  const [regModal, setRegModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const { login, setLogin } = useContext(StudentsContext);

  const MyButtons = () => {
    if (login) {
      return (
        <Dropdown.Item>
          <button disabled type="button" className="navBtn mt-1 mb-1 btn btn-outline-warning">
            Logout
          </button>
        </Dropdown.Item>
      );
    } else {
      return (
        <>
          <Dropdown.Item>
            <button
              type="button"
              className="navBtn mt-1 mb-1 btn btn-outline-warning"
              onClick={() => setLoginModal(!loginModal)}
            >
              Login
            </button>
          </Dropdown.Item>
          <Dropdown.Item>
            <button
              type="button"
              className="navBtn mt-1 mb-1 btn btn-outline-warning"
              onClick={() => setRegModal(!regModal)}
            >
              Register
            </button>
          </Dropdown.Item>
        </>
      );
    }
  };

  return (
    <>
      <Navigation fixed="top" bg="dark" variant="dark">
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
                    <button
                      type="button"
                      className="navBtn mt-1 mb-1 btn btn-outline-warning"
                      onClick={() => props.setActive(null)}
                    >
                      Recipes
                    </button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="Ingredients">
                    <button
                      type="button"
                      className="navBtn mt-1 mb-1 btn btn-outline-warning"
                      onClick={() => props.setActive(null)}
                    >
                      Ingredients
                    </button>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
        <Dropdown align="end">
          <Dropdown.Toggle className="arrowless-menu" variant="outline-warning" id="dropdown-basic">
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <MyButtons />
          </Dropdown.Menu>
        </Dropdown>
      </Navigation>
      <RegistrationModal show={regModal} setShow={setRegModal} setLogin={setLoginModal} />
      <LoginModal show={loginModal} setShow={setLoginModal} setLogin={setLoginModal}/>
    </>
  );
}

export default Navbar;

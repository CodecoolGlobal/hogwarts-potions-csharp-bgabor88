import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as Navigation, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthActions } from "../_actions/auth.actions";
import { history } from "../_helpers/history";

function Navbar(props) {
  const Buttons = ["Rooms", "Students"];
  const authActions = useAuthActions();
  const navigate = useNavigate();

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
                  <button
                    type="button"
                    className="navBtn mt-1 mb-1 btn btn-outline-warning"
                    onClick={() => {
                      props.setActive(null);
                      history.push("/Recipes");
                      navigate("/Recipes");
                    }}
                  >
                    Recipes
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    type="button"
                    className="navBtn mt-1 mb-1 btn btn-outline-warning"
                    onClick={() => {
                      props.setActive(null);
                      history.push("/Ingredients");
                      navigate("/Ingredients");
                    }}
                  >
                    Ingredients
                  </button>
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
            <Dropdown.Item>
              <button onClick={authActions.logout} type="button" className="navBtn mt-1 mb-1 btn btn-outline-warning">
                Logout
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navigation>
    </>
  );
}

export default Navbar;

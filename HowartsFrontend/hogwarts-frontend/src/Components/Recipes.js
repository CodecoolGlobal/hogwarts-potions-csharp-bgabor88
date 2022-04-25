import React, { useContext, useState } from "react";
import { RecipesContext } from "../DAL/ContextProviders/RecipesContext";
import { PotionsContext } from "../DAL/ContextProviders/PotionsContext";
import { ListGroup, Card, Container, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import IngredientList from "./IngredientList";

export default function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const { potions } = useContext(PotionsContext);
  const [open, setOpen] = useState(null);

  return (
    <Container className="d-flex flex-row flex-wrap justify-content-center m-0">
      {recipes.map((recipe) => (
        <Card bg="success" key={recipe.id} text="light" style={{ width: "30rem" }} className="mb-2 p-2 m-2">
          <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
            <div>{recipe.name}</div>
          </Card.Header>
          <Card.Body>
            <Card.Title className="d-flex flex-nowrap justify-content-between flex-row p-2">
              Ingredients:
              <i
                title={
                  open === recipe.id
                    ? "Click to close the used ingredients list"
                    : "Click to open the used ingredients list"
                }
                className="infoBtn"
                onClick={() => setOpen(open === recipe.id ? null : recipe.id)}
              >
                <FontAwesomeIcon icon={open === recipe.id ? faAngleUp : faAngleDown} size="1x" />
              </i>
              <IngredientList id={recipe.id} ingredients={recipe.ingredients} open={open} setOpen={setOpen} />
            </Card.Title>
            <Card.Title className="d-flex flex-nowrap justify-content-between flex-row p-2">
              Students who made this:
              <i
                title={
                  open === recipe.id + "students" ? "Click to close the student list" : "Click to open the student list"
                }
                className="infoBtn"
                onClick={() => setOpen(open === recipe.id + "students" ? null : recipe.id + "students")}
              >
                <FontAwesomeIcon icon={open === recipe.id + "students" ? faAngleUp : faAngleDown} size="1x" />
              </i>
              <Collapse in={open === recipe.id + "students"} className="ingredients">
                <ListGroup>
                  {potions
                    .filter((p) => p.recipe !== null && p.recipe.id === recipe.id)
                    .map((potion) => (
                      <ListGroup.Item key={potion.student.id}>
                        {potion.student.name} =={">"} {potion.name}
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                    <i title="Click to close the student list" className="infoBtn" onClick={() => setOpen(null)}>
                      <FontAwesomeIcon icon={faAngleUp} size="1x" />
                    </i>
                  </ListGroup.Item>
                </ListGroup>
              </Collapse>
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

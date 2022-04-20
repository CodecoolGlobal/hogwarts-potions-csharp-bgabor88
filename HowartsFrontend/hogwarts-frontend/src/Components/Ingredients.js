import React, { useContext, useState } from "react";
import { RecipesContext } from "../DAL/ContextProviders/RecipesContext";
import { IngredientsContext } from "../DAL/ContextProviders/IngredientsContext";
import { ListGroup, Card, Collapse, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { RegisterIngredient } from "../DAL/RegistrationComponents";

export default function Ingredients() {
  const { ingredients } = useContext(IngredientsContext);
  const { recipes } = useContext(RecipesContext);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);

  const Content = () => {
    if (selected.length === 0) {
      return (
        <Card
          bg="info"
          key="empty-ingredient"
          text="dark"
          className="d-flex flex-nowrap justify-content-center flex-column m-2"
        >
          <Card.Header className="d-flex flex-nowrap justify-content-center flex-row">
            <p>Choose an ingredient to inspect!</p>
          </Card.Header>
        </Card>
      );
    }
    const ingredient = selected[0];
    return (
      <Card
        bg="info"
        key={selected[0].id}
        text="dark"
        className="d-flex flex-nowrap justify-content-center flex-column m-2"
      >
        <Card.Header className="d-flex flex-nowrap justify-content-center flex-row">
          <p>{ingredient.name}</p>
        </Card.Header>
        <Card.Body>
          <div>
            {recipes.filter((r) => r.ingredients.some((i) => i.id === ingredient.id)).length === 0
              ? "No recipes used this!"
              : "Recipes using this ingredient:  "}
            <i
              hidden={
                recipes.filter((r) => r.ingredients.some((i) => i.id === ingredient.id)).length === 0 ? true : false
              }
              title={open === ingredient.id ? "Click to close the recipes list" : "Click to open the recipes list"}
              className="infoBtn p-2"
              onClick={() => setOpen(open === ingredient.id ? null : ingredient.id)}
            >
              <FontAwesomeIcon icon={open === ingredient.id ? faAngleUp : faAngleDown} size="1x" />
            </i>
          </div>
          <Collapse in={open === ingredient.id}>
            <ListGroup>
              {recipes
                .filter((r) => r.ingredients.some((i) => i.id === ingredient.id))
                .map((recipe) => (
                  <ListGroup.Item key={recipe.id}>{recipe.name}</ListGroup.Item>
                ))}
              <ListGroup.Item
                key="closeList"
                className="d-flex justify-content-center infoBtn"
                onClick={() => setOpen(null)}
                title="Click to close the recipes list"
              >
                <i>
                  <FontAwesomeIcon icon={faAngleUp} size="1x" />
                </i>
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="container">
      <div className="row d-flex flex-row justify-content-center flex-nowrap">
        <div className="col-auto">
          <Card bg="info" key="Select-ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
            <Card.Body className="p-0">
              <Form.Group>
                <Form.Label>Ingredients:</Form.Label>
                <Typeahead
                  id="ingredient-list"
                  size="lg"
                  labelKey="name"
                  onChange={setSelected}
                  options={ingredients}
                  placeholder="Choose an ingredient..."
                  selected={selected}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <RegisterIngredient />
        </div>
        <div className="col">
          <Content />
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { RecipesContext } from "../DAL/ContextProviders/RecipesContext";
import { IngredientsContext, AddIngredient } from "../DAL/ContextProviders/IngredientsContext";
import { ListGroup, Card, Collapse, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Ingredients() {
  const { ingredients, setIngredients } = useContext(IngredientsContext);
  const { recipes } = useContext(RecipesContext);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);

  const formHandler = (event) => {
    event.preventDefault();
    const ingredientData = {
      name: event.target[0].value,
    };
    AddIngredient(ingredients, setIngredients, ingredientData).then(() => event.target.reset());
  };

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
    <header className="App-header">
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

            <Card bg="info" key="Add-Ingredient" text="dark" style={{ width: "17rem" }} className="p-2 mt-2">
              <Card.Body className="p-0">
                <Form onSubmit={(e) => formHandler(e, e.target[0].value)}>
                  <Form.Label>Add new:</Form.Label>
                  <Form.Group className="pt-1">
                    <Form.Control
                      required
                      min="2"
                      size="lg"
                      type="text"
                      id="ingredientName"
                      placeholder="Ingredient Name"
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit" className="mt-2 mb-0 p-2">
                    Add ingredient
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Content />
          </div>
        </div>
      </div>
    </header>
  );
}

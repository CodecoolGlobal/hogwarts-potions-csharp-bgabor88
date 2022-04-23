import React from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function IngredientList(props) {
  const ingredients = props.ingredients;
  const open = props.open;
  const setOpen = props.setOpen;

  return (
    <Collapse in={open === props.id} className="ingredients">
      <ListGroup>
        {ingredients.map((ingredient) => (
            <ListGroup.Item key={ingredient.id}>
              {ingredient.name}
            </ListGroup.Item>
          ))}
        <ListGroup.Item key="closeList" className="d-flex justify-content-center">
          <i title="Click to close" className="infoBtn" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faAngleUp} size="1x" />
          </i>
        </ListGroup.Item>
      </ListGroup>
    </Collapse>
  );
}

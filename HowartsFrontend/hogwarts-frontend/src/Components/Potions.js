import React, { useContext, useState } from "react";
import { PotionsContext } from "../DAL/ContextProviders/PotionsContext";
import { ListGroup, Card, Container, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faAward, faClone, faFlaskVial } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function Potions() {
  const { potions, setPotions } = useContext(PotionsContext);
  const [open, setOpen] = useState(null);

  const brewStatuses = ["Currently brewing", "Done! This is a Replica", "Done! This is a new Discovery"];

  return (
    <header className="App-header">
      <Container className="d-flex flex-row flex-wrap justify-content-center m-0">
        {potions.map((potion) => (
          <Card
            bg={potion.status === 2 ? "warning" : potion.status === 1 ? "success" : "secondary"}
            key={potion.id}
            text="light"
            style={{ width: "18rem" }}
            className="mb-2 p-2 m-2"
          >
            <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
              <div>
                <i
                  title={`Potion status is: ${brewStatuses[potion.status]}`}
                  className={potion.status === 2 ? "discovery" : potion.status === 1 ? "replica" : "brew"}
                >
                  <FontAwesomeIcon
                    icon={potion.status === 2 ? faAward : potion.status === 1 ? faClone : faFlaskVial}
                    size="1x"
                  />
                </i>
                {" " + potion.name}
              </div>
              <i
                title={
                  open === potion.id
                    ? "Click to close the used ingredients list"
                    : "Click to open the used ingredients list"
                }
                className="infoBtn"
                onClick={() => setOpen(open === potion.id ? null : potion.id)}
              >
                <FontAwesomeIcon icon={open === potion.id ? faAngleUp : faAngleDown} size="1x" />
              </i>
            </Card.Header>
            <Card.Body>
              <Collapse in={open === potion.id} className="ingredients">
                <ListGroup>
                  {potion.usedIngredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient.id}>{ingredient.name}</ListGroup.Item>
                  ))}
                  <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                    <i title="Click to close the ingredients list" className="infoBtn" onClick={() => setOpen(null)}>
                      <FontAwesomeIcon icon={faAngleUp} size="1x" />
                    </i>
                  </ListGroup.Item>
                </ListGroup>
              </Collapse>
              <Card.Title>Owner: {potion.student.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </header>
  );
}

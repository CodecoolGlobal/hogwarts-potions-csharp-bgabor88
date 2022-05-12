import React, { useContext, useState } from "react";
import { PotionsContext } from "../DAL/ContextProviders/PotionsContext";
import { Card, Container, Collapse, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faAward, faClone, faFlaskVial } from "@fortawesome/free-solid-svg-icons";

export default function Potions(props) {
  const { potions } = useContext(PotionsContext);
  const potionsByStudent = potions.filter((p) => p.student.id === props.student.id);
  const [open, setOpen] = useState(null);

  const brewStatuses = ["Currently brewing", "Done! This is a Replica", "Done! This is a new Discovery"];
  return (
    <Container className="d-flex flex-column flex-wrap justify-content-center m-0">
      {potionsByStudent.map((potion) => (
        <Card
          bg={potion.status === 2 ? "warning" : potion.status === 1 ? "success" : "secondary"}
          key={potion.id}
          text="light"
          border="dark"
          className="p-2 m-2 potion-card"
        >
          <Card.Header className="d-flex flex-nowrap justify-content-between flex-row">
            <div>
              <FontAwesomeIcon
                title={`Potion status is: ${brewStatuses[potion.status]}`}
                className={potion.status === 2 ? "discovery" : potion.status === 1 ? "replica" : "brew"}
                icon={potion.status === 2 ? faAward : potion.status === 1 ? faClone : faFlaskVial}
                size="1x"
              />
              {" " + potion.name}
            </div>
            <FontAwesomeIcon
              title={
                open === potion.id
                  ? "Click to close the used ingredients list"
                  : "Click to open the used ingredients list"
              }
              className="hover mt-2"
              onClick={() => setOpen(open === potion.id ? null : potion.id)}
              icon={open === potion.id ? faAngleUp : faAngleDown}
              size="1x"
            />
          </Card.Header>
          <Collapse in={open === potion.id}>
            <ListGroup>
              {potion.usedIngredients.map((ingredient) => (
                <ListGroup.Item key={ingredient.id}>{ingredient.name}</ListGroup.Item>
              ))}
              <ListGroup.Item key="closeList" className="d-flex justify-content-center">
                <FontAwesomeIcon
                  title="Click to close"
                  className="hover"
                  onClick={() => setOpen(false)}
                  icon={faAngleUp}
                  size="1x"
                />
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
        </Card>
      ))}
    </Container>
  );
}

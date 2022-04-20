import React, { useState, Collapse, ListGroup as div } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function StudentData(props) {
  const student = props.student;
  const houseTypes = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const petTypes = ["None", "Cat", "Rat", "Owl"];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        {`Potions: ${student.potions.length}`}
        {/* <i
          title={open ? "Click to close the potion list" : "Click to open the potion list"}
          className="infoBtn"
          onClick={() => setOpen(open)}
          hidden={student.potions.length < 1 ? true : false}
        >
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} size="1x" />
        </i>
        <Collapse in={open} className="ingredients">
          <div>
            {student.potions.map((potion) => (
              <div key={potion.id}>
                  <p>{potion.name}</p>
              </div>
            ))}
            <div key="closeList" className="d-flex justify-content-center">
              <i title="Click to close the potion list" className="infoBtn" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faAngleUp} size="1x" />
              </i>
            </div>
          </div>
        </Collapse> */}
      </div>
      <div>{`Recipes: ${student.recipes.length}`}</div>
      <div>{`House: ${houseTypes[student.houseType]}`}</div>
      <div>{`Pet: ${petTypes[student.petType]}`}</div>
    </>
  );
}

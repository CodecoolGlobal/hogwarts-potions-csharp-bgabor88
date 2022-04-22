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
      <div >
        {`Potions: ${student.potions.length}`}
      </div>
      <div>{`Recipes: ${student.recipes.length}`}</div>
      <div>{`House: ${houseTypes[student.houseType]}`}</div>
      <div>{`Pet: ${petTypes[student.petType]}`}</div>
    </>
  );
}

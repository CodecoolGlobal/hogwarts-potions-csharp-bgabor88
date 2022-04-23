import React from "react";
import Potions from './Potions';

export default function StudentData(props) {
  const student = props.student;
  const houseTypes = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const petTypes = ["None", "Cat", "Rat", "Owl"];

  return (
    <>
      <div >
        {`Potions: ${student.potions.length}`}
        <Potions student={student} />
      </div>
      <div>{`Recipes: ${student.recipes.length}`}</div>
      <div>{`House: ${houseTypes[student.houseType]}`}</div>
      <div>{`Pet: ${petTypes[student.petType]}`}</div>
    </>
  );
}

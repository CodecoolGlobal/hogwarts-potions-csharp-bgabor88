import React, { useState, useEffect, createContext } from "react";
import { apiGet, apiPost } from "../CRUD";

export const IngredientsContext = createContext();

export const AddIngredient = async (ingredients, setIngredients, ingredientData) => {
  const newIngredient = await apiPost("/ingredient", ingredientData);
  await setIngredients([...ingredients, newIngredient]);
};

export const IngredientsProvider = (props) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/ingredient");
        setIngredients([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>{props.children}</IngredientsContext.Provider>
  );
};

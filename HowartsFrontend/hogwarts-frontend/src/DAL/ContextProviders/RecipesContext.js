import React, { useState, useEffect, createContext } from "react";
import { apiGet } from "../CRUD";

export const RecipesContext = createContext();

export const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/recipe");
        setRecipes([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <RecipesContext.Provider value={{ recipes, setRecipes }}>{props.children}</RecipesContext.Provider>;
};

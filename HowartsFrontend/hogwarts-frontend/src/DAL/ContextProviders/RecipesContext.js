import React, { useState, useEffect, createContext } from "react";
import { useFetchWrapper } from "../../_helpers/fetch-wrapper";

export const RecipesContext = createContext();

export const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const fetchWrapper = useFetchWrapper();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWrapper.get("/recipe");
        setRecipes([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <RecipesContext.Provider value={{ recipes, setRecipes }}>{props.children}</RecipesContext.Provider>;
};

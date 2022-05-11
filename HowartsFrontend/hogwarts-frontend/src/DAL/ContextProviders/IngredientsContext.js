import React, { useState, useEffect, createContext, useCallback } from "react";
import { useFetchWrapper } from "../../_helpers/fetch-wrapper";

export const IngredientsContext = createContext();

export const IngredientsProvider = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const fetchWrapper = useFetchWrapper();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWrapper.get("/ingredient");
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

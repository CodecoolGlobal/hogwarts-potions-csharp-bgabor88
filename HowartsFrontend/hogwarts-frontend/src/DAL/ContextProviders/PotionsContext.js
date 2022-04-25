import React, { useState, useEffect, createContext } from "react";
import { apiGet } from "../CRUD";

export const PotionsContext = createContext();

export const PotionsProvider = (props) => {
  const [potions, setPotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/potion");
        setPotions([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <PotionsContext.Provider value={{ potions, setPotions }}>{props.children}</PotionsContext.Provider>;
};

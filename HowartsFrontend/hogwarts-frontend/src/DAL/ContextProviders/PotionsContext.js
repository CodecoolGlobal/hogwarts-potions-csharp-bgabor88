import React, { useState, useEffect, createContext } from "react";
import { useFetchWrapper } from "../../_helpers/fetch-wrapper";

export const PotionsContext = createContext();

export const PotionsProvider = (props) => {
  const [potions, setPotions] = useState([]);
  const fetchWrapper = useFetchWrapper();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWrapper.get("/potion");
        setPotions([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <PotionsContext.Provider value={{ potions, setPotions }}>{props.children}</PotionsContext.Provider>;
};

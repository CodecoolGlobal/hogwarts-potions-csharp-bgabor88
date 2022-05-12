import React, { useState, useEffect, createContext } from "react";
import { useFetchWrapper } from "../../_helpers/fetch-wrapper";

export const RoomsContext = createContext();

export const RoomsProvider = (props) => {
  const [rooms, setRooms] = useState([]);
  const fetchWrapper = useFetchWrapper();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWrapper.get("/room");
        setRooms([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RoomsContext.Provider value={{ rooms, setRooms }}>{props.children}</RoomsContext.Provider>;
};

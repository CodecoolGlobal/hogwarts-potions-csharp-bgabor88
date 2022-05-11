import React, { useState, useEffect, createContext } from "react";
import { apiDelete, apiGet, apiPost } from "../CRUD";
import { useFetchWrapper } from "../../_helpers/fetch-wrapper";

export const AddRoom = (setRooms, capacity) => {
  console.log("here")
  const fetchWrapper = useFetchWrapper();
  const newRoom = fetchWrapper.post("/room", { capacity: capacity });
  setRooms(rooms => [...rooms, newRoom]);
};

export const DeleteRoom = async (rooms, setRooms, id) => {
  const fetchWrapper = useFetchWrapper();
  const updatedRooms = [...rooms];
  await fetchWrapper.delete(`room/${id}`);
  await setRooms(updatedRooms.filter((room) => room.id !== id));
};

export const RoomsContext = createContext();

export const RoomsProvider = (props) => {
  const [rooms, setRooms] = useState([]);
  const fetchWrapper = useFetchWrapper();
  useEffect(() => {
    const fetchData = () => {
      try {
        const data = fetchWrapper.get("/room");
        setRooms([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <RoomsContext.Provider value={{ rooms, setRooms }}>{props.children}</RoomsContext.Provider>;
};

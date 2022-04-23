import React, { useState, useEffect, createContext } from "react";
import { apiDelete, apiGet, apiPost } from "../CRUD";

export const AddRoom = async (setRooms, capacity) => {
  const newRoom = await apiPost("/room", { capacity: capacity });
  await setRooms(rooms => [...rooms, newRoom]);
};

export const DeleteRoom = async (rooms, setRooms, id) => {
  const updatedRooms = [...rooms];
  await apiDelete(`room/${id}`);
  await setRooms(updatedRooms.filter((room) => room.id !== id));
};

export const RoomsContext = createContext();

export const RoomsProvider = (props) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/room");
        setRooms([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <RoomsContext.Provider value={{ rooms, setRooms }}>{props.children}</RoomsContext.Provider>;
};

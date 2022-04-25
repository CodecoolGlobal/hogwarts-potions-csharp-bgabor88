import React, { useContext } from "react";
import RoomCard from "./RoomCard";
import { RoomsContext } from "../DAL/ContextProviders/RoomsContext";
import { RegisterRoom } from "../DAL/RegistrationComponents";

export default function Rooms() {
  const { rooms } = useContext(RoomsContext);

  return (
    <div className="container row d-flex flex-row justify-content-center flex-nowrap">
      <div className="col-auto">
        <RegisterRoom />
      </div>
      <div className="col d-flex flex-row flex-wrap justify-content-center">
        {rooms.map((room) => (
          <RoomCard room={room}  key={room.id}/>
        ))}
      </div>
    </div>
  );
}

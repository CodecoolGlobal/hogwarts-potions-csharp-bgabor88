import React, { useState, useEffect, createContext } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../CRUD";
import { stateUpdater } from "../../Utils/Utilities";

export const AddToRoom = async (studentId, roomId, setStudents, setRooms) => {
  const updatedStudent = await apiPut(`/student/${studentId}/occupy/${roomId}`);
  const updatedRoom = await apiGet(`room/${roomId}`);
  stateUpdater(updatedStudent, setStudents);
  stateUpdater(updatedRoom, setRooms);
};

export const LeaveRoom = async (studentId, roomId, setStudents, setRooms) => {
  const updatedStudent = await apiPut(`/student/${studentId}/leave/${roomId}`);
  const updatedRoom = await apiGet(`room/${roomId}`);
  stateUpdater(updatedStudent, setStudents);
  stateUpdater(updatedRoom, setRooms);
};

export const AddStudent = async (students, setStudents, studentData) => {
  const newStudent = await apiPost("/student", studentData);
  await setStudents([...students, newStudent]);
  return newStudent;
};

export const DeleteStudent = async (students, setStudents, id) => {
  const updatedstudents = [...students];
  await apiDelete(`student/${id}`).then(async () => {
    await setStudents(updatedstudents.filter((student) => student.id !== id));
  });
};

export const StudentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/student");
        setStudents([...data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return <StudentsContext.Provider value={{ students, setStudents }}>{props.children}</StudentsContext.Provider>;
};

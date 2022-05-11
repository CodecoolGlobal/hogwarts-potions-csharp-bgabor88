import React, { useState, useEffect, createContext } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../CRUD";

export const AddToRoom = async (studentId, roomId, setStudents, setRooms) => {
  const updatedStudent = await apiPut(`/student/${studentId}/occupy/${roomId}`);
  const updatedRoom = await apiGet(`room/${roomId}`);
  await setStudents((students) => students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
  await setRooms((rooms) => rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
};

export const LeaveRoom = async (studentId, roomId, setStudents, setRooms) => {
  const updatedStudent = await apiPut(`/student/${studentId}/leave/${roomId}`);
  const updatedRoom = await apiGet(`room/${roomId}`);
  await setStudents((students) => students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
  await setRooms((rooms) => rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
};

export const AddStudent = async (setStudents, studentData) => {
  const newStudent = await apiPost("/student", studentData);
  await setStudents((students) => [...students, newStudent]);
  return newStudent;
};

export const DeleteStudent = async (students, setStudents, id) => {
  const updatedstudents = [...students];
  await apiDelete(`student/${id}`).then(async () => {
    await setStudents(updatedstudents.filter((student) => student.id !== id));
  });
};

export const LoginStudent = async (setLogin, studentData) => {
  const response = await apiPost(`login`, studentData);
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

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {props.children}
    </StudentsContext.Provider>
  );
};

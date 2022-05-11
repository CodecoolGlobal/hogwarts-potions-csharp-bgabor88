import React, { useState, useEffect, createContext } from "react";
import { apiGet, apiPost, apiPut } from "../CRUD";
import { useStudentActions } from "../../_actions/student.actions";

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

export const StudentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);
  const studentActions = useStudentActions();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studentActions.getStudents();
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

import React, { useState, useEffect, createContext } from "react";
import { useStudentActions } from "../../_actions/student.actions";

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

import { useFetchWrapper } from "../_helpers/fetch-wrapper";

export { useStudentActions };

function useStudentActions() {
  const baseUrl = "/student";
  const fetchWrapper = useFetchWrapper();

  return {
    getStudents,
    remove,
  };

  function remove(id, setStudents) {
    fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      setStudents((students) => students.filter((student) => student.id !== id));
    });
  };

  function getStudents() {
    return fetchWrapper.get(baseUrl);
  };
};

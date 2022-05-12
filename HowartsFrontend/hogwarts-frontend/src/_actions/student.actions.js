import { useFetchWrapper } from "../_helpers/fetch-wrapper";
import { useRoomActions } from "./room.actions"

export { useStudentActions };

function useStudentActions() {
  const baseUrl = "/student";
  const fetchWrapper = useFetchWrapper();
  const roomActions = useRoomActions();

  return {
    getStudents,
    remove,
    occupyRoom,
    leaveRoom,
  };

  async function leaveRoom(roomId, studentId, setStudents, setRooms){
    const updatedStudent = await fetchWrapper.put(`${baseUrl}/${studentId}/leave/${roomId}`);
    const updatedRoom = await roomActions.getRoom(roomId);
    setStudents((students) => students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    setRooms((rooms) => rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  }

  async function occupyRoom(roomId, studentId, setStudents, setRooms) {
    const updatedStudent = await fetchWrapper.put(`${baseUrl}/${studentId}/occupy/${roomId}`);
    const updatedRoom = await roomActions.getRoom(roomId);
    setStudents((students) => students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    setRooms((rooms) => rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  }

  function remove(id, setStudents) {
    fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      setStudents((students) => students.filter((student) => student.id !== id));
    });
  }

  function getStudents() {
    return fetchWrapper.get(baseUrl);
  }
}

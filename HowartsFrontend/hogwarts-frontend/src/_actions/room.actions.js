import { useFetchWrapper } from "../_helpers/fetch-wrapper";

export { useRoomActions };

function useRoomActions() {
  const baseUrl = "/room";
  const fetchWrapper = useFetchWrapper();

  return {
    add,
    remove,
  };

  function add(capacity, setRooms) {
    fetchWrapper.post(baseUrl, { capacity }).then((room) => {
      setRooms((rooms) => [...rooms, room]);
    });
  }

  function remove(id, setRooms) {
    fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      setRooms((rooms) => rooms.filter((room) => room.id !== id));
    });
  }
}

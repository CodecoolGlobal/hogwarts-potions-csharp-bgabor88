import { useSetRecoilState } from "recoil";
import { history } from "../_helpers/history";
import { useFetchWrapper } from "../_helpers/fetch-wrapper";
import { authAtom } from "../_state/auth";
import { useNavigate } from "react-router-dom";

export { useStudentActions };

function useStudentActions() {
  const baseUrl = "/student";
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  return {
    login,
    register,
    logout,
  };

  function register(email, password) {
    return fetchWrapper.post(`${baseUrl}/register`, { email, password }).then((user) => {
      history.push("/login");
      navigate("/login");
    });
  }

  function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/login`, { email, password }).then((student) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(student));
      setAuth(student);
      history.push("/");
      navigate("/");
    });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    history.push("/");
  }
}

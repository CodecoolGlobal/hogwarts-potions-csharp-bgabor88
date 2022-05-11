import React, { useState, useEffect } from "react";
import RegistrationModal from "./RegistrationModal";
import LoginModal from "./LoginModal";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../_state/auth";
import { history } from "../../_helpers/history";

export default function Landing() {
  const [regModal, setRegModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing">
      <RegistrationModal show={regModal} setShow={setRegModal} setLogin={setLoginModal} />
      <LoginModal show={loginModal} setShow={setLoginModal} setLogin={setLoginModal} />
      <button
        type="button"
        className="navBtn p-3 mt-5 mb-1 btn btn-dark btn-outline-warning"
        onClick={() => setLoginModal(!loginModal)}
      >
        Login
      </button>

      <button
        type="button"
        className="navBtn p-3 mt-1 mb-1 btn btn-dark btn-outline-warning"
        onClick={() => setRegModal(!regModal)}
      >
        Register
      </button>
    </div>
  );
}

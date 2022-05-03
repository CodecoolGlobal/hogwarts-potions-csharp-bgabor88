import React from "react";
import { Modal } from "react-bootstrap";
import LoginArea from "../DAL/LoginArea";

export default function LoginModal(props) {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginArea />
      </Modal.Body>
    </Modal>
  );
}

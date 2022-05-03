import React from "react";
import { Modal } from "react-bootstrap";
import { RegisterStudent } from "../DAL/RegistrationComponents";

export default function RegistrationModal(props) {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterStudent setLogin={props.setLogin} setShow={props.setShow}/>
      </Modal.Body>
    </Modal>
  );
}

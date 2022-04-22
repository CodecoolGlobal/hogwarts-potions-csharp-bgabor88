import React, { useState } from "react";
import PotionData from "./StudentData";
import { Modal, Card } from "react-bootstrap";

export default function PotionModal(props) {
  const [show, setShow] = useState(false);
  const potion = props.potion;

  return (
    <>
      <div className="listBtn" onClick={() => setShow(true)}>
        {potion.name}
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{potion.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            bg="info"
            key={potion.id}
            text="dark"
            className="d-flex flex-nowrap justify-content-center flex-column m-2"
          >
            <Card.Body>
              <PotionData potion={potion} />
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

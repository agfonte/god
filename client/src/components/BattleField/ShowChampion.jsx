import React from "react";
import { Button, Modal, FormLabel } from "react-bootstrap";
export default function ShowChampion(props) {
  return (
    <Modal centered show={props.show} onHide={props.handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Battle Finished.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 id="test-show-champion" className={"text-center"}>
          The Winner of the Championship is {props.winner}
        </h1>
        <h2 className={"text-center"}>Congratulations!!!</h2>
      </Modal.Body>
      <Modal.Footer>
        <FormLabel>Play Again?</FormLabel>
        <Button
          id="test-button-playAgain"
          variant={"primary"}
          onClick={props.playAgain}
        >
          Bring it on!!!
        </Button>
        <Button
          id="test-homeScreen"
          variant={"primary"}
          onClick={props.homeScreen}
        >
          Nop
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

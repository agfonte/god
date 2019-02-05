import React from "react";
import { Button, Modal } from "react-bootstrap";
export default function ShowHandWinner(props) {
  let headermessage;
  if (props.winner === undefined) {
    headermessage = (
      <div className={"text-center"}>
        <p>
          There is no Winner of the Round {props.round}.The result was a tie.
        </p>
      </div>
    );
  } else {
    headermessage = (
      <div className={"text-center"}>
        <h3>
          Congratulations <strong>{props.winner}</strong>!!!
        </h3>
        <h4>You are the winner of the Round {props.round}</h4>
        <h5>
          You won <strong>{props.handUser1}</strong> <i>vs</i>{" "}
          <strong>{props.handUser2}</strong>
        </h5>
      </div>
    );
  }
  return (
    <Modal centered show={props.show} onHide={props.handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Round {props.round} Finished.</Modal.Title>
      </Modal.Header>
      <Modal.Body>{headermessage}</Modal.Body>
      <Modal.Footer>
        <Button variant={"primary"} onClick={props.handleCloseModal}>
          Next Round
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

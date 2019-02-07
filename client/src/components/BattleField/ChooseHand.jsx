import React from "react";
import { Row, Button, Col, Container } from "react-bootstrap";
export default function ChooseHand(props) {
  let { moves } = props;
  const chooseHand = (
    <Container>
      <Row id="test-array-moves" className={"justify-content-center text-center"}>
        {moves.map(mov => {
          return (
            <Col key={mov} className={"text-center"}>
              <Button
                id={"test-move-" + { mov }}
                onClick={evt => {
                  props.onChoose(mov, props.user);
                }}
              >
                {mov.toUpperCase()}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
  return chooseHand;
}

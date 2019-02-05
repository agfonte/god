import React from "react";
import { Row, Button, Col, Container } from "react-bootstrap";
export default function ChooseHand(props) {
  let { moves } = props;
  const chooseHand = (
    <Container>
      <Row className={"justify-content-center text-center"}>
        {moves.map(mov => {
          return (
            <Col key={mov} className={"text-center"}>
              <Button
                onClick={evt => {
                  this.props.onChoose(mov, props.user);
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

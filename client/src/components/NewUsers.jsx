import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Row,
  Container
} from "react-bootstrap";
import StoredPlayers from "./StoredPlayers";
import PropTypes from "prop-types";
class NewUsers extends Component {
  handleChoosePlayer = p => {
    if (this.props.user1 === undefined || this.props.user1 === "") {
      this.props.handleUserChange(p, undefined);
    } else if (this.props.user2 === undefined || this.props.user2 === "") {
      this.props.handleUserChange(undefined, p);
    }
  };
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <StoredPlayers
            handleChoosePlayer={this.handleChoosePlayer}
            user1={this.props.user1}
            user2={this.props.user2}
            handleLoadUsers={this.props.handleLoadUsers}
            numOfPlayers={this.props.numOfPlayers}
          />
        </Row>
        <Row className="justify-content-center">
          <Form>
            <Col>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Player 1"
                  name={"Name Player 1"}
                  value={this.props.user1}
                  onChange={evt => {
                    this.props.handleUserChange(
                      evt.target.value,
                      undefined,
                      true
                    );
                  }}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormControl
                  type="input"
                  placeholder="Player 2"
                  name={"Name Player 2"}
                  value={this.props.user2}
                  onChange={evt => {
                    this.props.handleUserChange(
                      undefined,
                      evt.target.value,
                      true
                    );
                  }}
                />
              </FormGroup>
            </Col>
          </Form>
        </Row>
      </Container>
    );
  }
}

NewUsers.propTypes = {
  user1: PropTypes.string.isRequired,
  user2: PropTypes.string.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleLoadUsers: PropTypes.func.isRequired,
  numOfPlayers: PropTypes.number.isRequired
};

export default NewUsers;

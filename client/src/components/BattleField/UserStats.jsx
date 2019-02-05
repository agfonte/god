import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Col
} from "react-bootstrap";
import PropTypes from "prop-types";
import { urls } from "../URL";
const axios = require("axios");

class UserStats extends Component {
  state = {
    name: undefined,
    stats: {},
    games: [],
    roundsWin: 0,
    roundsLose: 0
  };
  componentWillReceiveProps() {
    axios.get(urls.users, { headers: { name: this.props.user } }).then(data => {
      let user = data.data.user;
      if (data.data.user) {
        this.setState({
          name: user.user,
          stats: user.stats,
          games: user.games
        });
      }
    });
  }
  componentDidMount() {
    axios.get(urls.users, { headers: { name: this.props.user } }).then(data => {
      let user = data.data.user;
      if (data.data.user) {
        this.setState({
          name: user.user,
          stats: user.stats,
          games: user.games
        });
      }
    });
  }

  render() {
    let { name, stats, games } = this.state;
    return (
      <Container className={"mt-5 text-center"}>
        <Row className="justify-content-center text-center">
          <Card>
            <Card.Title>{name}</Card.Title>
            <hr />
            <Card.Body>
              <Row className="justify-content-center text-center">
                <h5>Previous Games</h5>
              </Row>
              <Row className="justify-content-center text-center">
                <Card.Text className="mr-2">Win: {stats.win}</Card.Text>
                <Card.Text>Lose: {stats.lose}</Card.Text>
              </Row>
              <hr />
              <Row className="justify-content-center text-center">
                <h5>Current Game</h5>
              </Row>
              <Row className="justify-content-center text-center">
                <Card.Text className="mr-2">Win: {this.props.win}</Card.Text>
                <Card.Text>Lose: {this.props.lose}</Card.Text>
              </Row>
              <hr />
              <Row>
                <Col>
                  <h5>Last 3 Games</h5>
                  <ListGroup>
                    {games
                      .reverse()
                      .slice(0, 3)
                      .map((game, i) => {
                        return (
                          <ListGroupItem key={i}>
                            <h5>Against: {game.against}</h5>
                            <h6>
                              Result: {game.win} vs {game.lose}{" "}
                            </h6>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}
UserStats.propTypes = {
  user: PropTypes.string.isRequired,
  win: PropTypes.number.isRequired,
  lose: PropTypes.number.isRequired
};
export default UserStats;

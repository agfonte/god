import React, { Component } from "react";
import NewUsers from "./NewUsers";
import { Button, Container, Row, Modal, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BattleField from "./BattleField/BattleField";
import SettingsButton from "./Settings/SettingsButton";
import Settings from "./Settings/Settings";
import { urls } from "./URL";
import UserStats from "./BattleField/UserStats";
const axios = require("axios");
class Game extends Component {
  state = {
    selectPlayers: true,
    users: false,
    user1: "",
    user2: "",
    winUser1: 0,
    winUser2: 0,
    show: false,
    settings: false,
    numOfPlayers: 5
  };
  componentWillMount() {
    axios.get(urls.settings).then(data => {
      this.setState({ numOfPlayers: Number(data.data.top) });
    });
  }
  handleNumOfPlayers = value => {
    this.setState({ numOfPlayers: value });
  };
  handleUserChange = (user1, user2) => {
    if (user1 !== undefined) {
      this.setState({ user1: user1 });
    }
    if (user2 !== undefined) {
      this.setState({ user2: user2 });
    }
  };

  render() {
    let welcomeScreen = undefined;
    let battlefield = undefined;
    let settings = (
      <Settings
        handleChangeNumber={value => {
          axios.put(urls.settings, { top: value }).then(() => {
            this.setState({ numOfPlayers: value });
          });
        }}
        handleCloseModal={() => {
          this.setState({ settings: false });
        }}
      />
    );
    let message = "Enter Player's Names ".concat(
      this.state.users.length !== 0 ? "or choose one of the list" : ""
    );

    if (this.state.selectPlayers) {
      welcomeScreen = (
        <Container className="center">
          <Row className="justify-content-center" style={{ marginTop: 5 }}>
            <h1 style={{ color: "red" }}>{"GoD"}</h1>
            <h1 style={{ color: "white" }}>{"| Game of Drones"}</h1>
            <div style={{ padding: 5 }}>
              <SettingsButton handleSettingsClick={this.handleSettingsClick} />
            </div>
          </Row>
          <Row className="justify-content-center">
            <h2 style={{ color: "white" }}>Welcome players</h2>
          </Row>
          <Row className="justify-content-center">
            <h3 style={{ color: "white" }}>{message}</h3>
          </Row>
          <Row className="justify-content-center">
            <NewUsers
              handleUserChange={this.handleUserChange}
              handleLoadUsers={b => this.setState({ users: b })}
              user1={this.state.user1}
              user2={this.state.user2}
              numOfPlayers={this.state.numOfPlayers}
            />
          </Row>
          <Row className="justify-content-center mt-2">
            <Button
              onClick={e => {
                this.checkUsers();
              }}
            >
              Start Battle
            </Button>
          </Row>
          <Modal centered show={this.state.show} onHide={this.handleCloseModal}>
            <Modal.Header>
              <Modal.Title>Undefined Players</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please fill out both player's names or check that they aren't the
              same.{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button variant={"primary"} onClick={this.handleCloseModal}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    } else {
      battlefield = (
        <Container>
          <Row>
            <Col md={3}>
              <Container>
                <UserStats
                  user={this.state.user1}
                  win={this.state.winUser1}
                  lose={this.state.winUser2}
                />
              </Container>
            </Col>
            <Col md={6}>
              <BattleField
                user1={this.state.user1}
                user2={this.state.user2}
                onRoundWin={wuser => {
                  let { winUser1, winUser2 } = this.state;
                  if (wuser === this.state.user1) {
                    this.setState({ winUser1: winUser1 + 1 });
                  } else {
                    this.setState({ winUser2: winUser2 + 1 });
                  }
                }}
                onBattleEnded={() => {
                  this.setState({
                    winUser1: 0,
                    winUser2: 0
                  });
                }}
                back={this.homeScreen}
              />
            </Col>
            <Col md={3}>
              <Container>
                <UserStats
                  user={this.state.user2}
                  win={this.state.winUser2}
                  lose={this.state.winUser1}
                />
              </Container>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <div>{this.state.settings ? settings : welcomeScreen || battlefield}</div>
    );
  }
  handleSettingsClick = () => {
    this.setState({ settings: true });
  };
  homeScreen = () => {
    this.setState({
      selectPlayers: true,
      users: false,
      user1: undefined,
      user2: undefined,
      show: false
    });
  };
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  checkUsers = () => {
    let { user1, user2 } = this.state;
    if (
      user1 === undefined ||
      user1 === "" ||
      user2 === undefined ||
      user2 === "" ||
      user1 === user2
    ) {
      this.setState({ show: true });
    } else {
      axios
        .get(urls.users)
        .then(users => {
          let exist = { user1: false, user2: false };
          for (let user in users.data.users) {
            if (user.user === user1) {
              exist.user1 = true;
            }
            if (user.user === user2) {
              exist.user2 = true;
            }
          }
          if (!exist.user1) {
            axios.post(urls.users, {
              user: user1,
              stats: {
                win: 0,
                lose: 0
              },
              games: []
            });
          }
          if (!exist.user2) {
            axios.post(urls.users, {
              user: user2,
              stats: {
                win: 0,
                lose: 0
              },
              games: []
            });
          }
          this.setState({ selectPlayers: false });
        })
        .catch(err => {
          this.setState({ show: true });
        });
    }
  };
}

export default Game;

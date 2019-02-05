import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  FormGroup,
  FormControl,
  Alert
} from "react-bootstrap";
import { urls } from "../URL";
import ComboBox from "./ComboBox";

const axios = require("axios");

class Settings extends Component {
  state = {
    close: false,
    users: [],
    moves: [],
    matchedUsers: [],
    selectedUser: undefined,

    matchedDeleteMoves: [],
    deleteMove: undefined,

    matchedEditMoves: [],
    editMove: undefined,

    addkiller: undefined,
    addkilled: undefined,
    remkiller: "",
    remkilled: "",

    numOfPlayers: undefined,
    alert: false,
    alertMessage: ""
  };
  loadUsers = () => {
    axios.get(urls.users).then(data => {
      this.setState({ users: data.data.users, matchedUsers: [] }, () => {
        this.handleUserChange({ target: { value: "" } });
      });
    });
  };
  loadMoves = async () => {
    await axios.get(urls.moves).then(data => {
      this.setState({
        moves: data.data.moves,
        matchedDeleteMoves: data.data.moves.map(mov => {
          return mov.move;
        })
      });
    });
  };
  componentDidMount() {
    this.loadUsers();
    this.loadMoves();
  }

  handleUserChange = evt => {
    let { users } = this.state;
    let matchedUsers = [];
    for (let u in users) {
      if (users[u].user.startsWith(evt.target.value)) {
        matchedUsers.push(users[u].user);
      }
    }
    this.setState({ matchedUsers, selectedUser: evt.target.value });
  };
  newMove = () => {
    if (
      this.state.addkiller !== undefined &&
      this.state.addkiller !== "" &&
      this.state.addkilled !== undefined &&
      this.state.addkilled !== ""
    ) {
      return "  [" + this.state.addkiller + "->" + this.state.addkilled + "]";
    }
  };
  delMove = () => {
    if (this.state.remkiller !== "" && this.state.remkilled !== "") {
      return "  [" + this.state.remkiller + "->" + this.state.remkilled + "]";
    }
  };
  handleDeleteUser = async evt => {
    let name = this.state.selectedUser;
    await axios
      .delete(urls.users, { data: { name: this.state.selectedUser } })
      .then(resp => {
        this.setState({
          selectedUser: undefined,
          alert: true,
          alertMessage: "User " + name + " deleted"
        });
        this.loadUsers();
      });
  };
  matchDeleteMoves = () => {
    let { moves, remkilled, remkiller } = this.state;
    let tm,
      matchedDeleteMoves = [];
    console.log(remkilled, remkiller);
    for (let index in moves) {
      tm = moves[index].move;
      if (tm[0].startsWith(remkiller) && tm[1].startsWith(remkilled)) {
        matchedDeleteMoves.push([tm[0], tm[1]]);
      }
    }
    this.setState({ matchedDeleteMoves });
  };
  handleAddMove = async () => {
    let { addkiller, addkilled } = this.state;
    await axios
      .post(urls.moves, {
        move: [addkiller, addkilled]
      })
      .then(res => {
        let m;
        if (res.data.status === "Fail") {
          m = res.data.message;
        } else {
          m = "Move " + addkiller + " -> " + addkilled + " added";
        }
        this.setState(
          {
            matchedDeleteMoves: [],
            deleteMove: undefined,

            matchedEditMoves: [],
            editMove: undefined,

            addkiller: undefined,
            addkilled: undefined,
            remkiller: "",
            remkilled: "",
            alert: true,
            alertMessage: m
          },
          () => {
            this.loadMoves();
          }
        );
      });
  };
  handleChangeKillerMove = evt => {
    this.setState({ addkiller: evt.target.value });
  };
  handleChangeKilledMove = evt => {
    this.setState({ addkilled: evt.target.value });
  };
  handleRemKillerMove = evt => {
    this.setState({ remkiller: evt.target.value }, () => {
      this.matchDeleteMoves();
    });
  };
  handleRemKilledMove = evt => {
    this.setState({ remkilled: evt.target.value }, () => {
      this.matchDeleteMoves();
    });
  };
  handleDeleteMoveSelection = evt => {
    let value = evt.target.value;
    if (value.includes("->")) {
      value = value.split("->");
      this.setState({ remkiller: value[0], remkilled: value[1] });
    }
  };
  handleDeleteMove = async evt => {
    let { remkiller, remkilled } = this.state;
    await axios
      .delete(urls.moves, {
        data: { move: [this.state.remkiller, this.state.remkilled] }
      })
      .then(res => {
        let m;
        if (res.data.status === "Fail") {
          m = res.data.message;
        } else {
          m = "Move " + remkiller + " -> " + remkilled + " removed";
        }
        this.setState(
          {
            matchedDeleteMoves: [],
            deleteMove: undefined,

            matchedEditMoves: [],
            editMove: undefined,

            addkiller: undefined,
            addkilled: undefined,
            remkiller: "",
            remkilled: "",
            alert: true,
            alertMessage: m
          },
          () => {
            this.loadMoves();
          }
        );
      });
  };
  handleNumOfPlayersChange = evt => {
    this.setState({ numOfPlayers: evt.target.value });
  };
  render() {
    return (
      <Modal
        centered
        show
        role={"document"}
        onHide={this.props.handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Delete User</h5>
          <FormGroup>
            <Row>
              <Col>
                <FormControl
                  type="text"
                  placeholder="User name"
                  style={{ marginBottom: "0.5rem" }}
                  onChange={this.handleUserChange}
                />
              </Col>
              <Col>
                <ComboBox
                  default={"Select User"}
                  matched={this.state.matchedUsers}
                  handleClickEvent={evt =>
                    this.setState({
                      selectedUser:
                        evt.target.value === "Select User"
                          ? undefined
                          : evt.target.value
                    })
                  }
                />
              </Col>
            </Row>
            <Button onClick={this.handleDeleteUser}>
              Delete User {this.state.selectedUser}
            </Button>
          </FormGroup>
          <hr />
          <h5>Moves</h5>
          <h6>Add Move</h6>
          <FormGroup>
            <Row>
              <Col>
                <FormControl
                  type="text"
                  placeholder="Killer"
                  style={{ marginBottom: "0.5rem" }}
                  onChange={evt =>
                    this.setState({ addkiller: evt.target.value })
                  }
                />
              </Col>
              <Col>
                <FormControl
                  type="text"
                  placeholder="Killed"
                  style={{ marginBottom: "0.5rem" }}
                  onChange={evt =>
                    this.setState({ addkilled: evt.target.value })
                  }
                />
              </Col>
            </Row>
            <Button onClick={this.handleAddMove}>
              Add move {this.newMove()}
            </Button>
          </FormGroup>
          <h6>Delete Move</h6>
          <FormGroup>
            <Row>
              <Col>
                <FormControl
                  type="text"
                  placeholder="Killer"
                  style={{ marginBottom: "0.5rem" }}
                  onChange={this.handleRemKillerMove}
                />
              </Col>
              <Col>
                <FormControl
                  type="text"
                  placeholder="Killed"
                  style={{ marginBottom: "0.5rem" }}
                  onChange={this.handleRemKilledMove}
                />
              </Col>
              <Col>
                <ComboBox
                  default={"Select Move"}
                  matched={this.state.matchedDeleteMoves}
                  handleClickEvent={this.handleDeleteMoveSelection}
                />
              </Col>
            </Row>
            <Button onClick={this.handleDeleteMove}>
              Delete move {this.delMove()}
            </Button>
          </FormGroup>
          <hr />
          <h5>Amount of top's player being displayed</h5>
          <FormGroup>
            <FormControl
              type="number"
              placeholder="Example: 5"
              style={{ marginBottom: "0.5rem" }}
              onChange={evt => {
                this.setState({ numOfPlayers: evt.target.value });
              }}
            />
            <Button
              onClick={() => {
                this.props.handleChangeNumber(this.state.numOfPlayers);
                this.setState({
                  alert: true,
                  alertMessage:
                    "Changed number of players to:" + this.state.numOfPlayers
                });
              }}
            >
              Submit
            </Button>
          </FormGroup>
          <FormGroup>
            <Alert
              variant={"info"}
              dismissible
              show={this.state.alertMessage === "" ? false : this.state.alert}
              onClose={() => {
                this.setState({ alert: false });
              }}
            >
              {this.state.alertMessage}
            </Alert>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} onClick={this.props.handleCloseModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Settings;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChooseHand from "./ChooseHand";
import ShowHandWinner from "./ShowHandWinner";
import ShowChampion from "./ShowChampion";
import { urls } from "../URL";
class BattleField extends Component {
  state = {
    currentPlayer: this.props.user1,
    winner: undefined,
    user1: this.props.user1,
    user2: this.props.user2,
    round: 1,
    stats: {
      user1: 0,
      user2: 0
    },
    resolve: false,
    finished: false,
    currentHandP1: undefined,
    currentHandP2: undefined,
    moves: [],
    kills: {},
    style: "red"
  };
  componentDidMount() {
    const axios = require("axios");
    axios
      .get(urls.moves)
      .then(resmoves => {
        let m = resmoves.data.moves;
        let set = new Set();
        m.forEach(move => {
          set.add(move.move[0]);
          set.add(move.move[1]);
        });
        this.setState({ kills: resmoves.data.moves, moves: [...set] });
      })
      .catch(err => {
        return <div />;
      });
  }
  onChoose = (mov, user) => {
    let { user1, user2 } = this.props;
    if (user === user1) {
      this.setState({
        currentHandP1: mov,
        currentPlayer: user2,
        style: "green"
      });
    } else {
      this.setState(
        {
          currentHandP2: mov,
          currentPlayer: user1,
          resolve: true,
          style: "red"
        },
        () => {
          this.resolveBattle();
        }
      );
    }
  };
  resolveBattle = () => {
    let { stats, currentHandP1, currentHandP2, user1, user2 } = this.state;
    const win = this.resolveHandWin(currentHandP1, currentHandP2);
    let winner;
    if (win === 0) {
      stats.user1++;
      winner = user1;
      this.props.onRoundWin(user1);
    } else if (win === 1) {
      stats.user2++;
      winner = user2;
      this.props.onRoundWin(user2);
    } else {
      winner = undefined;
    }
    if (stats.user1 === 3 || stats.user2 === 3) {
      this.setState(
        {
          winner
        },
        () => {
          this.endBattle();
        }
      );
      return;
    } else {
      this.setState({
        stats: stats,
        winner: winner
      });
    }
  };
  resolveHandWin = (currentHandP1, currentHandP2) => {
    let { kills } = this.state;

    for (let move in kills) {
      if (
        kills[move].move[0] === currentHandP1 &&
        kills[move].move[1] === currentHandP2
      ) {
        return 0;
      } else {
        if (
          kills[move].move[0] === currentHandP2 &&
          kills[move].move[1] === currentHandP1
        ) {
          return 1;
        }
      }
    }
    return 2;
  };
  endBattle = () => {
    const axios = require("axios");
    let { stats, user1, user2 } = this.state;
    axios
      .put(urls.users, {
        name: user1,
        win: stats.user1,
        lose: stats.user2,
        against: user2
      })
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
    axios
      .put(urls.users, {
        name: user2,
        win: stats.user2,
        lose: stats.user1,
        against: user1
      })
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
    this.setState({
      stats: { user1: 0, user2: 0 },
      resolve: false,
      finished: true,
      currentHandP1: undefined,
      currentHandP2: undefined,
      round: 1
    });
    this.props.onBattleEnded();
  };
  nextRound = () => {
    let round = this.state.round;
    this.setState({
      round: round + 1,
      winner: undefined,
      resolve: false,
      currentHandP1: undefined,
      currentHandP2: undefined
    });
  };
  playAgain = () => {
    this.setState({
      stats: { user1: 0, user2: 0 },
      resolve: false,
      finished: false,
      currentHandP1: undefined,
      currentHandP2: undefined,
      winner: undefined
    });
  };
  render() {
    let { round, currentPlayer, moves, finished } = this.state;
    let { user1, user2 } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <input
              type={"image"}
              id={"exit-img"}
              src={"./back.png"}
              alt={"Home icon"}
              style={{
                height: "40px",
                width: "40px",
                background: "transparent"
              }}
              onClick={this.props.back}
            />
          </Col>
        </Row>
        <Row className={"justify-content-center"}>
          <h1 style={{ color: "white", fontSize: "4rem" }}>Round {round}</h1>
        </Row>
        <Row className={"justify-content-center"}>
          <h2 style={{ color: "white" }}>
            <Row className={"justify-content-center"}>
              <p style={{ color: "red" }}>{user1}</p>
            </Row>
            <Row className={"justify-content-center"}>
              <strong>
                <i>vs</i>
              </strong>
            </Row>
            <Row className={"justify-content-center"}>
              <p style={{ color: "green" }}>{user2}</p>
            </Row>
          </h2>
        </Row>
        <Row className={"justify-content-center"}>
          <h3 style={{ color: "white" }} className={"mr-2"}>
            Choose your hand{" "}
          </h3>
          <h3 style={{ color: this.state.style }}>
            {this.state.currentPlayer}
          </h3>
        </Row>
        <Row>
          <ChooseHand
            user={currentPlayer}
            round={round}
            moves={moves}
            onChoose={this.onChoose}
          />
        </Row>
        <ShowHandWinner
          winner={this.state.winner}
          round={round}
          handUser1={this.state.currentHandP1}
          handUser2={this.state.currentHandP2}
          show={this.state.resolve}
          handleCloseModal={this.nextRound}
        />
        <ShowChampion
          playAgain={this.playAgain}
          show={finished}
          winner={this.state.winner}
          homeScreen={this.props.back}
        />
        ;
      </Container>
    );
  }
}

BattleField.propTypes = {
  user1: PropTypes.string,
  user2: PropTypes.string,
  back: PropTypes.func
};
BattleField.defaultProps = {
  user1: "",
  user2: "",
  back: () => {}
};
export default BattleField;

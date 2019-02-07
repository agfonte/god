import React from "react";
import BattleField from "../components/BattleField/BattleField";
import { urls } from "../components/URL";
import { shallow, mount } from "enzyme";
const axios = require("axios");
describe("<BattleField />", () => {
  it("should be define Game", () => {
    expect(BattleField).toBeDefined();
  });
  it("renders 1 <BattleField /> component", () => {
    const component = shallow(<BattleField />);
    expect(component).toHaveLength(1);
  });

  it("should have right amount of moves", async () => {
    let moves = await axios.get(urls.moves);
    moves = moves.data.moves;
    let set = new Set();
    moves.forEach(move => {
      set.add(move.move[0]);
      set.add(move.move[1]);
    });

    const component = mount(<BattleField user1="user1" user2="user2" />);
    const choose = component.find("#test-array-moves");
    expect(choose).toHaveLength(set.size);
  });
  
    it("renders 1 <Game /> component", () => {
      const component = shallow(<BattleField />);
      expect(component).toMatchSnapshot();
    });
  // it("Should resolve round win", async () => {
  //   let moves = await axios.get(urls.moves);
  //   moves = moves.data.moves;
  //   const mockWinner = jest.fn(wuser => {
  //     console.log("joasdaosdk");
  //     return wuser;
  //   });
  //   const component = shallow(
  //     <BattleField
  //       user1="user1"
  //       user2="user2"
  //       currentHandP1={moves[0].move[0]}
  //       currentHandP2={moves[0].move[0]}
  //       onRoundWin={mockWinner}
  //     />
  //   );
  //   const resolve = jest.spyOn(component.instance(), "resolveBattle");
  //   console.log(resolve());
  //   console.log(mockWinner.mock.calls);
  // });
});

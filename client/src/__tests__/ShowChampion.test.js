import React from "react";
import ShowChampion from "../components/BattleField/ShowChampion";
import { shallow } from "enzyme";

describe("<ShowChampion />", () => {
  it("<ShowChampion/> to be defined", () => {
    expect(ShowChampion).toBeDefined();
  });
  it("renders 1 <ShowChampion /> component", () => {
    const component = shallow(<ShowChampion />);
    expect(component).toHaveLength(1);
  });
  it("renders 1 <ShowChampion /> component", () => {
    const playAgain = jest.fn();
    const homeScreen = jest.fn();
    const component = shallow(
      <ShowChampion homeScreen={homeScreen} playAgain={playAgain} />
    );

    component.find("#test-button-playAgain").simulate("click");
    expect(playAgain.mock.calls.length).toBe(1);

    component.find("#test-homeScreen").simulate("click");
    expect(playAgain.mock.calls.length).toBe(1);
  });
});

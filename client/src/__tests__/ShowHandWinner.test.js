import React from "react";
import ShowHandWinner from "../components/BattleField/ShowHandWinner";
import { shallow } from "enzyme";

describe("<ShowHandWinner />", () => {
  it("renders 1 <ShowHandWinner /> component", () => {
    const component = shallow(
      <ShowHandWinner show={true} winner={undefined} round={1} />
    );
    expect(component.find("#test-round").exists()).toBe(true);
  });
  it("should click once", () => {
    const mockfn = jest.fn();
    const component = shallow(
      <ShowHandWinner
        show={true}
        winner={undefined}
        round={1}
        handleCloseModal={mockfn}
      />
    );
    component.find("#test-next-round-button").simulate("click");
    expect(mockfn.mock.calls.length).toBe(1);
  });
});

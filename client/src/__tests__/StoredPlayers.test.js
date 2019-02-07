import React from "react";
import StoredPlayers from "../components/StoredPlayers";
import { shallow } from "enzyme";

describe("<StoredPlayers />", () => {
  it("renders 1 <StoredPlayers /> component", () => {
    const mk = jest.fn();
    const mk1 = jest.fn();
    const component = shallow(
      <StoredPlayers
        handleLoadUsers={mk}
        handleChoosePlayer={mk1}
        numOfPlayers={3}
        user1="dummy1"
        user2="dummy2"
      />
    );
    expect(component).toHaveLength(1);
  });
});

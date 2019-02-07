import React from "react";
import Game from "../components/Game";
import {
  shallow
} from "enzyme";

describe("<Game />", () => {
  it("should be define Game", () => {
    expect(Game).toBeDefined();
  });
  it("renders 1 <Game /> component", () => {
    const component = shallow( < Game / > );
    expect(component).toMatchSnapshot();
  });
});
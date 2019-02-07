import React from "react";
import UserStats from "../components/BattleField/UserStats";
import { shallow, mount, render } from "enzyme";

describe("<UserStats />", () => {
  it("<UserStats/> to be defined", () => {
    expect(UserStats).toBeDefined();
  });
  it("renders 1 <UserStats /> component", () => {
    const component = shallow(<UserStats user="dummy" win={3} lose={1} />);
    expect(component).toHaveLength(1);
  });
  it("renders 1 <UserStats /> component", () => {
    const component = mount(<UserStats win={3} lose={1} user="dummy" />);
    expect(component.find("#test-list-last-battle").children()).toHaveLength(6);
  });
  it("component render correctly", () => {
    const component = render(<UserStats user="dummy" win={3} lose={1} />);
    expect(component).toMatchSnapshot();
  });
});

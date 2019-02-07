import React from "react";
import Settings from "../components/Settings/Settings";
import { shallow, render, mount } from "enzyme";

describe("<Settings />", () => {
  it("renders 1 <Settings /> component", () => {
    const component = shallow(<Settings />);
    expect(component).toHaveLength(1);
  });
  it("have 3 selects tags", () => {
    const component = mount(<Settings />);
    expect(component.find("select")).toHaveLength(2);
  });
  it("must match snaptshot", () => {
    const component = shallow(<Settings />);
    expect(component).toMatchSnapshot();
  });
});

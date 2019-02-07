import React from "react";
import ComboBox from "../components/Settings/ComboBox";
import { shallow, mount } from "enzyme";

describe("<ComboBox />", () => {
  it("renders 1 <ComboBox /> component", () => {
    const component = shallow(<ComboBox matched={["one", "two"]} />);
    expect(component).toHaveLength(1);
  });
  it("should have a firt item select", () => {
    const component = mount(<ComboBox matched={[]} />);
    expect(component.find("option")).toHaveLength(1);
  });
  it("should have 3 items select", () => {
    const component = mount(<ComboBox matched={["one", "two"]} />);
    expect(component.find("option")).toHaveLength(3);
  });
});

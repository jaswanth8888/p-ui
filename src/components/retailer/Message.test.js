import React from "react";
import { shallow } from "enzyme";
import { Message } from "./Message";
import { Typography } from "@material-ui/core";

const wrapper = shallow(<Message msg={"alert"} />);
describe("<Message/> test", () => {
  it("should render Typography element", () => {
    expect(wrapper.find(Typography)).toHaveLength(1);
  }),
    it("should render 1 div element", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    }),
    it("The topogrpahy element should conatin test", () => {
      expect(wrapper.find(Typography).text()).toBe("alert");
    });
});

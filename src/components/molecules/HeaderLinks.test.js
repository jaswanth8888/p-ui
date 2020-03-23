import React from "react";
import { shallow } from "enzyme";
import { HeaderLinks } from "./HeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../atoms/Button";

const wrapper = shallow(<HeaderLinks />);
describe("<HeaderLinks/> test", () => {
  it("should render 1 List element", () => {
    expect(wrapper.find(List)).toHaveLength(1);
  }),
    it("should render 1 ListItem element", () => {
      expect(wrapper.find(ListItem)).toHaveLength(1);
    }),
    it("should render 2 Button elements", () => {
      expect(wrapper.find(Button)).toHaveLength(2);
    }),
    it("The Login Button should have Login test in it", () => {
      expect(
        wrapper
          .find(Button)
          .at(0)
          .text()
      ).toBe("Login");
    }),
    it("The Login Button should have Login test in it", () => {
      expect(
        wrapper
          .find(Button)
          .at(1)
          .text()
      ).toBe("Logout");
    });
});

import React from "react";
import { shallow } from "enzyme";
import RegularButton from "./Button";
import Button from "@material-ui/core/Button";

let wrapped = shallow(<RegularButton />);
describe("Test Regular Button Component", () => {
  it("Should render 1 button", () => {
    expect(wrapped.find(Button)).toHaveLength(1);
  });
});

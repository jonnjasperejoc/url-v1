import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import HomePage from "../components/HomePage";

test("should render HomePage correctly", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<HomePage />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

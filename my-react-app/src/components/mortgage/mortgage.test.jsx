/* eslint-disable no-unused-vars */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, test } from "vitest";
import { Mortgage } from "./Mortgage.jsx";
import { FullScreenSection } from "../fullScreenSection/FullScreenSection.jsx";

describe("<Mortgage /> rendering", () => {
  it("check if Mortgage children is rendered", () => {
    render(<Mortgage />);
    const mortgageTitle = screen.getByText("Mortgage Calculator");
    expect(mortgageTitle).toBeInTheDocument();
  });

  // it("check if form is rendered", () => {
  //   render(<Mortgage />);

  //   const input = screen.getByLabelText("numberbox");
  //   fireEvent.change(input, { target: { value: "hellow" } });

  //   expect(input).t
  // });
});

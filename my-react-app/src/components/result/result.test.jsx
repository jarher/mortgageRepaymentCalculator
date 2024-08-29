/* eslint-disable no-unused-vars */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, test } from "vitest";
import { Result } from "./Result.jsx";

describe("<Result /> rendering", () => {
  it("check if Result is rendered", () => {
    render(<Result />);
  });
});

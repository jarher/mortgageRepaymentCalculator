/* eslint-disable no-unused-vars */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, test } from "vitest";
import App from "./App.jsx";

describe("verify loading components", () => {
  it("check if exists component App", () => {
    render(<App />);
  });
});

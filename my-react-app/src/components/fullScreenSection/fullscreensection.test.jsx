/* eslint-disable no-unused-vars */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, test } from "vitest";
import { FullScreenSection } from "./FullScreenSection.jsx";

describe("<FullScreenSection /> rendering", () => {
  it("check if Mortgage children is rendered", () => {
    render(<FullScreenSection />);
  });
});

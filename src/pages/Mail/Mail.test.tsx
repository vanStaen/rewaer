import React from "react";
import { render, screen } from "@testing-library/react";
import MailPage from "./Mail";

describe("MailPage", () => {
  it("renders Messenger heading", () => {
    render(<MailPage />);
    expect(screen.getByText("Messenger")).toBeInTheDocument();
  });
});

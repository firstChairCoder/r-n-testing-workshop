import "react-native";
import React from "react";
import { fireEvent, render, waitFor, cleanup } from "@testing-library/react-native";
import App from "../App";

//AsyncStorage mock
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

// afterEach(cleanup)

it("should render/navigate through app screens", async () => {
  const { getByText } = render(<App />);
  const homeText = getByText(/home/i);
  expect(homeText).not.toBeNull();
  fireEvent.press(getByText(/counter/i));

  await waitFor(() => {
    const counterText = getByText(/Current count:/i);
    expect(counterText.props.children).toEqual(["Current count: ", 0]);
  });
});

import React from "react";
import Counter from "../src/components/Counter";
import { render, fireEvent } from "@testing-library/react-native";

it("renders correctly", () => {
	const { getByText, getByTestId } = render(<Counter />);

	const decrement = getByTestId(/decrement/i);
	const increment = getByTestId(/increment/i);
	const counterText = getByText(/Current count:/i);

	expect(counterText.props.children).toEqual(["Current count: ", 0]);
	//add once
	fireEvent.press(increment);
	expect(counterText.props.children).toEqual(["Current count: ", 1]);
	//reduce once
	fireEvent.press(decrement);
	expect(counterText.props.children).toEqual(["Current count: ", 0]);
});

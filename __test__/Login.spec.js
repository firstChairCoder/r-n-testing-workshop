import React from "react";
import Login from "../src/components/Login";
import { render, fireEvent } from "@testing-library/react-native";

it("should render correctly", async () => {
	const username = "6MD9";
	const password = "snikwaD";
	let submittedData = {};

	const handleSubmit = jest.fn(data => (submittedData = data));

	const { getByText, getByPlaceholderText } = render(
		<Login onSubmit={handleSubmit} />,
	);
	const btn = getByText(/submit/i);

	await fireEvent.changeText(getByPlaceholderText(/username/i), username);
	await fireEvent.changeText(getByPlaceholderText(/password/i), password);

	fireEvent.press(btn);
	expect(submittedData).toEqual({ password, username });
	expect(handleSubmit).toHaveBeenCalledWith({ password, username });
	expect(handleSubmit).toHaveBeenCalledTimes(1);
});

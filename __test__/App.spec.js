/*create an item
  delete an item
  create multiple items
  should show error when trying to create invalid todo
  error warning should disappear once valid item is created
*/
import React from "react";
import App from "../App";
import { render, fireEvent } from "@testing-library/react-native";

//what it/test asserts?
it("should create an item", () => {
	//render component
	const { getByText, getByPlaceholderText } = render(<App />);
	//find btn by text
	const addItemBtn = getByText("+");
	//find textinput using placeholder
	const textInput = getByPlaceholderText("Write something");

	const dummyText = "todo #1";

	//types in input
	fireEvent.changeText(textInput, dummyText);
	//presses add btn
	fireEvent.press(addItemBtn);

	const createdItem = getByText(dummyText);

	//verify presence of text
	expect(createdItem).not.toBeNull();
});

it("should create multiple items", () => {
	//render component
	const { getByText, getByPlaceholderText } = render(<App />);
	//find btn by text
	const addItemBtn = getByText("+");
	//find textinput using placeholder
	const textInput = getByPlaceholderText("Write something");

	const dummyText = "todo #1";
	const dummy2 = "todo #2";

	//types in input
	fireEvent.changeText(textInput, dummyText);
	//presses add btn
	fireEvent.press(addItemBtn);

	fireEvent.changeText(textInput, dummy2);
	//presses add btn
	fireEvent.press(addItemBtn);

	const createdItem = getByText(dummyText);
	const Item2 = getByText(dummy2);

	//verify presence of text
	expect(createdItem).not.toBeNull();
	expect(Item2).not.toBeNull();
});

it("should delete an item", () => {
	const { getByText, getByPlaceholderText, queryByText } = render(<App />);
	//find btn by text
	const addItemBtn = getByText("+");
	//find textinput using placeholder
	const textInput = getByPlaceholderText("Write something");

	const dummyText = "todo #1";

	//types in input
	fireEvent.changeText(textInput, dummyText);
	//presses add btn
	fireEvent.press(addItemBtn);

	const deleteItemBtn = getByText("X");

	fireEvent.press(deleteItemBtn);

	const deletedItem = queryByText(dummyText);

	expect(deletedItem).toBeNull();
});

it("should display an error when adding item without text", () => {
	const { getByText } = render(<App />);

	const addItemBtn = getByText("+");

	fireEvent.press(addItemBtn);

	const errorMsg = getByText("Please insert a valid text");

	expect(errorMsg).not.toBeNull();
});

it("should remove error message after creating valid item", () => {
	const { getByText, getByPlaceholderText, queryByText } = render(<App />);

	const addItemBtn = getByText("+");

	fireEvent.press(addItemBtn);

	const textInput = getByPlaceholderText("Write something");

	const dummyText = "todo #1";

	fireEvent.changeText(textInput, dummyText);
	fireEvent.press(addItemBtn);

	const errorMsg = queryByText("Please insert a valid text");

	expect(errorMsg).toBeNull();
});

import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import LoginSubmission from "../src/components/LoginSubmission";
import { SCREENS } from "../src/utils/constants";

//AsyncStorage mock
jest.mock("@react-native-async-storage/async-storage", () => ({
	setItem: jest.fn(),
}));

//React Navigation mock
jest.mock("@react-navigation/native", () => {
	return {
		createNavigatorFactory: jest.fn(),
		useNavigation: jest.fn(),
	};
});
jest.mock("@react-navigation/stack", () => ({
	createStackNavigator: jest.fn(),
}));
// jest.mock('@react-native-community/masked-view', ()=> ({}))

beforeEach(() => {
	useNavigation.mockReset();
	//window.localStorage.removeItem("token")
});

//Main fn
it("should render correctly", async () => {
	const mockNav = jest.fn();
	useNavigation.mockImplementation(() => ({ navigate: mockNav }));
	const fakeRes = Promise.resolve({ token: "fake-token-abc" });

	global.fetch.mockResolvedValueOnce({
		json: () => Promise.resolve({ token: "fake-token-abc" }),
	});

	const username = "boyalinco";
	const password = "misspepeye4eva";
	const { getByText, getByPlaceholderText } = render(<LoginSubmission />);
	const btn = getByText(/submit/i);

	await fireEvent.changeText(getByPlaceholderText(/username/i), username);
	await fireEvent.changeText(getByPlaceholderText(/password/i), password);
	fireEvent.press(btn);

	await getByText(/loading/i);
	expect(global.fetch).toHaveBeenCalledWith("https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: { "content-type": "application/json" },
	});

	expect(global.fetch.mock.calls).toMatchInlineSnapshot(`
		Array [
		  Array [
		    "https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login",
		    Object {
		      "body": "{\\"username\\":\\"boyalinco\\",\\"password\\":\\"misspepeye4eva\\"}",
		      "headers": Object {
		        "content-type": "application/json",
		      },
		      "method": "POST",
		    },
		  ],
		]
	`);

	await waitFor(() => expect(mockNav).toHaveBeenCalledTimes(1));
	expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "fake-token-abc");
	expect(mockNav).toHaveBeenCalledWith(SCREENS.HOME);
});

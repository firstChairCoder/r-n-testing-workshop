/* ------------ SKIP FOR NOW!!!!!!  ------------ */

import React from "react";
import { StatusBar } from "react-native";
import Video from "../src/components/Video";
import { render } from "@testing-library/react-native";

const navMock = {
	setOptions: jest.fn(),
};

jest.mock("expo-av", () => {
	const mockComponent = require("react-native/jest/mockComponent");
	return mockComponent("expo-av");
});

it("should render/navigate throughout app screens", async () => {
	const { getByLabelText, getByTestId } = render(<Video nav={navMock} />);
	const video = getByLabelText(/video component/i);
	const enterFullScreenButton = getByTestId(/enter-full-screen/i);
	const pauseStartButton = getByTestId(/pause-start/i);

	//video is initially playing and presented not on full screen
	/* no access to these props directly in expo-av */
	// expect(video.props.paused).toBeFalsy();
	// expect(video.props.fullscreen).toBeFalsy();
	// expect(video.props.style).toEqual({
	expect(video).toHaveStyle({
		width: 100,
		height: 100,
	});

	expect(StatusBar._propsStack[0].hidden.value).toBeTruthy();

	//play video and exit full screen mode
	const pauseStartFSButton = getByTestId(/pause-start-fs/i);
	fireEvent.press(pauseStartFSButton);
	expect(video.props.paused).toBeFalsy();

	const exitFullScreenButton = getByTestId(/exit-full-screen/i);
	fireEvent.press(exitFullScreenButton);
	expect(video.props.fullscreen).toBeFalsy();
});

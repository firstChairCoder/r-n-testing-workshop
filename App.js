import "react-native-gesture-handler";
import React from "react";
import Counter from "./src/components/Counter";
import LoginSubmission from "./src/components/LoginSubmission";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EasyButton from "./src/components/EasyButton";
import Home from "./src/components/Home";
import Modal from "./src/components/Modal";
import VideoScreen from "./src/components/Video";
import { ThemeProvider } from "./src/utils/theme";
import { SCREENS } from "./src/utils/constants"

const Stack = createStackNavigator();

export default () => {
  return (
    <>
      <ThemeProvider initialTheme={"dark"}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name={SCREENS.HOME} component={Home} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginSubmission} />
            <Stack.Screen name={SCREENS.EASYBUTTON} component={EasyButton} />
            <Stack.Screen name={SCREENS.COUNTER} component={Counter} />
            <Stack.Screen name={SCREENS.VIDEO} component={VideoScreen} />
            <Stack.Screen name={SCREENS.MODAL} component={Modal} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
};

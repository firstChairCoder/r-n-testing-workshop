import React, { ComponentType, ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react-native";
import { ThemeProvider } from "../utils/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export * from "@testing-library/react-native";

function render(ui, { theme = "light", ...options } = {}) {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}></ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// override React Testing Library's render with our own
export { render };

const Stack = createStackNavigator();

export const renderWithNavigation = ({
  screens = {},
  navigatorConfig = {},
} = {}) =>
  render(
    <NavigationContainer>
      <Stack.Navigator {...navigatorConfig}>
        {Object.keys(screens).map(name => (
          <Stack.Screen key={name} name={name} component={screens[name]} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>,
  );

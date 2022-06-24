// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import AddList from "./src/components/AddList";
// import ItemsList from "./src/components/ItemList";
// import Error from "./src/components/ErrorComponent";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   inputArea: {
//     flex: 2,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   listArea: {
//     flex: 8,
//     paddingTop: 20,
//     alignItems: "center",
//     width: "80%",
//     marginVertical: 15,
//   },
// });

// export default function App() {
//   const [listInput, setListInput] = useState("");
//   const [list, setList] = useState([]);
//   const [error, setError] = useState(false);

//   const handleInput = text => {
//     setListInput(text);
//   };

//   const handleSetList = () => {
//     if (!listInput) {
//       setError(true);
//       return;
//     }

//     const newInput = {
//       id: Math.random() * 1000,
//       value: listInput,
//     };

//     setList([...list, newInput]);
//     setListInput("");
//     setError(false);
//   };

//   const handleDelete = id => {
//     setList(list.filter(item => item.id !== id));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputArea}>
//         <AddList
//           onPressAdd={handleSetList}
//           value={listInput}
//           onChange={handleInput}
//         />
//       </View>
//       <View style={styles.listArea}>
//         <ItemsList data={list} onDelete={handleDelete} />
//         <Error visible={error}>Please insert a valid text</Error>
//       </View>
//     </View>
//   );
// }

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

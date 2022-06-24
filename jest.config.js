const path = require("path");
// const jestPreset = require("@testing-library/react-native/jest-preset");

module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    // "@testing-library/react-native/cleanup-after-each",   //REDUNDANT
    "@testing-library/jest-native/extend-expect",
    "./jest.setup.js",
  ],
  clearMocks: true,
  verbose: true,
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js",
  },
};

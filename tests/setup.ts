import "react-native";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native-gesture-handler");
jest.mock("react-native-screens", () => ({
  enableScreens: jest.fn(),
}));
jest.mock("redux-persist/lib/createPersistoid", () =>
  jest.fn(() => ({
    update: jest.fn(),
    flush: jest.fn(),
  })),
);

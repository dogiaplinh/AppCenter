import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

function Main() {
  const theme = DefaultTheme;
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);

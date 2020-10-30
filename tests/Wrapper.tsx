import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";
import store from "../app/store";

export function Wrapper(Component) {
  return (props: JSX.IntrinsicAttributes) => (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <Component {...props} />
      </PaperProvider>
    </Provider>
  );
}

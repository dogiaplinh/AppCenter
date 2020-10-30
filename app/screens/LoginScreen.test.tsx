import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { Wrapper } from "../../tests/Wrapper";
import LoginScreen from "./LoginScreen";

jest.mock("../utils/ApiClient");
jest.mock("../store");
import store from "../store";

const TestLogin = Wrapper(LoginScreen);

it("Test invalid login", async () => {
  const { getByTestId } = render(<TestLogin />);
  fireEvent.changeText(getByTestId("apiKeyInput"), "abc");
  fireEvent.press(getByTestId("loginButton"));
  await waitFor(() => getByTestId("errorTitle"));
});

it("Test success login", async () => {
  const { getByTestId } = render(<TestLogin />);
  fireEvent.changeText(getByTestId("apiKeyInput"), "token");
  fireEvent.press(getByTestId("loginButton"));
  await waitFor(() => expect(store.getState().user.logged).toEqual(true));
});

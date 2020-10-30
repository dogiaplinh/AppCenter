import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Wrapper } from "../../tests/Wrapper";
import AppListScreen from "./AppListScreen";

jest.mock("../utils/ApiClient");
jest.mock("../store");
const TestScreen = Wrapper(AppListScreen);

it("Test invalid login", async () => {
  const { getAllByTestId, getByTestId } = render(<TestScreen />);
  const cards = await waitFor(() => getAllByTestId("appCard"));
  expect(cards.length).toEqual(1);
});

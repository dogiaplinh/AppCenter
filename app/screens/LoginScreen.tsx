import React, { memo, useCallback, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setApiToken } from "../actions";
import apiClient from "../helpers/apiClient";
import { AllState } from "../store";

const LoginScreen = () => {
  const user = useSelector((state: AllState) => state.user);
  const [key, setKey] = useState<string>(user.apiToken);
  const dispatch = useDispatch();
  const loginCallback = useCallback(async () => {
    if (key) {
      apiClient.setToken(key);
      const userResp = await apiClient.getUser();
      if (userResp) {
        dispatch(setApiToken(key));
      }
    }
  }, [key]);
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>API Token</Text>
      <TextInput
        style={styles.textInput}
        placeholder="API key"
        value={key}
        onChangeText={(text) => setKey(text)}
      />
      <Button title="Login" onPress={loginCallback} />
    </View>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderBottomWidth: 1,
    width: 200,
    padding: 0,
  },
  loginButton: {
    marginTop: 20,
  },
});

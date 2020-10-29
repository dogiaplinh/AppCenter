import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useState } from "react";
import { Linking, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setApiToken } from "../actions";
import apiClient from "../utils/ApiClient";
import { StackParamList } from "../models/ParamList";
import { AllState } from "../store";

type Props = {
  navigation: StackNavigationProp<StackParamList, "Login">;
};
const LoginScreen = ({ navigation }: Props) => {
  const user = useSelector((state: AllState) => state.user);
  const [key, setKey] = useState<string | undefined>(user.apiToken);
  const dispatch = useDispatch();
  const loginCallback = useCallback(async () => {
    if (key) {
      apiClient.setToken(key);
      const userResp = await apiClient.getCurrentUser();
      if (userResp) {
        dispatch(setApiToken(key));
      }
    }
  }, [key]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authorize App Center</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="API key"
          value={key}
          onChangeText={(text) => setKey(text)}
        />
        <Button mode="contained" onPress={loginCallback}>
          <Text>Login</Text>
        </Button>
      </View>
      <Button
        style={{ marginTop: 20 }}
        onPress={() => Linking.openURL("https://appcenter.ms/settings/apitokens")}
      >
        <Text>Get API Key</Text>
      </Button>
    </View>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    color: "black",
    alignSelf: "center",
    marginBottom: 100,
    fontSize: 26,
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 0,
    marginRight: 20,
    flex: 1,
  },
  loginButton: {
    marginTop: 20,
  },
});

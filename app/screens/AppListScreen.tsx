import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar, Card } from "react-native-paper";
import apiClient from "../utils/ApiClient";
import { AppItem } from "../models/ApiModels";
import { StackParamList } from "../models/ParamList";
import store from "../store";
import { useDispatch } from "react-redux";
import { setApiToken } from "../actions";

type Props = {
  navigation: StackNavigationProp<StackParamList, "AppList">;
};
const AppListScreen = ({ navigation }: Props) => {
  const [apps, setApps] = useState<AppItem[] | undefined>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!apiClient.token) {
      const state = store.getState();
      apiClient.setToken(state.user?.apiToken);
    }
    (async () => {
      const data = await apiClient.getApps();
      setApps(data);
    })();
  }, []);
  const logoutCallback = useCallback(() => {
    dispatch(setApiToken(undefined));
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Apps" />
        <Appbar.Action icon="logout" onPress={logoutCallback} testID="logoutButton" />
      </Appbar.Header>
      <FlatList
        data={apps}
        contentContainerStyle={{ paddingVertical: 5 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            testID="appCard"
            style={{ marginHorizontal: 16, marginVertical: 8 }}
            onPress={() => navigation.push("App", { app: item })}
          >
            <Card.Content>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.display_name}</Text>
              <Text>
                {item.os} - {item.platform}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default memo(AppListScreen);

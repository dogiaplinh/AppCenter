import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar, Card } from "react-native-paper";
import apiClient from "../utils/ApiClient";
import { AppItem } from "../models/ApiModels";
import { StackParamList } from "../models/ParamList";
import store from "../store";

type Props = {
  navigation: StackNavigationProp<StackParamList, "AppList">;
};
const AppListScreen = ({ navigation }: Props) => {
  const [apps, setApps] = useState<AppItem[]>([]);
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
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Apps" />
      </Appbar.Header>
      <FlatList
        data={apps}
        contentContainerStyle={{ paddingVertical: 5 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
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

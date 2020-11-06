import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { ErrorGroup } from "../models/ApiModels";
import { StackParamList } from "../models/ParamList";
import apiClient from "../utils/ApiClient";
import { currentDay } from "../utils/DateUtils";

type Props = {
  navigation: StackNavigationProp<StackParamList, "Diagnostics">;
  route: RouteProp<StackParamList, "Diagnostics">;
};
const DiagnosticsScreen = ({ navigation, route }: Props) => {
  const { app, dateRange } = route.params;
  const now = currentDay();
  const [errorGroups, setErrorGroups] = useState<ErrorGroup[]>([]);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const errorGroups = await apiClient.getErrorGroups(app.owner.name, app.name, {
        ...dateRange,
      });
      if (isMounted) setErrorGroups(errorGroups?.errorGroups || []);
    })();
    return () => {
      isMounted = false;
    };
  }, [now]);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Diagnostics" />
      </Appbar.Header>
      <FlatList
        style={{ flex: 1 }}
        data={errorGroups}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <Card.Title
              title={`${item.count} errors / ${item.deviceCount} users / ${item.appVersion}`}
            />
            <Card.Content>
              <Text style={{ fontWeight: "bold" }}>{item.exceptionType}</Text>
              <Text numberOfLines={3} style={{ opacity: 0.8 }}>
                {item.exceptionMessage}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default memo(DiagnosticsScreen);

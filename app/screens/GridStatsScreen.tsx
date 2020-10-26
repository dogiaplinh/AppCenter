import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Appbar, Button, Card, Colors, ProgressBar } from "react-native-paper";
import { AppItem, CountsResult, StatsType } from "../models/ApiModels";
import { StackParamList } from "../models/ParamList";
import apiClient, { SearchCommonOptions } from "../utils/ApiClient";
import { dateBefore } from "../utils/DateUtils";

async function getData(app: AppItem, type: StatsType, options: SearchCommonOptions) {
  let result: CountsResult;
  switch (type) {
    case "model":
      result = await apiClient.getModels(app.owner.name, app.name, options);
      break;

    case "os":
      result = await apiClient.getOSes(app.owner.name, app.name, options);
      break;

    case "version":
      result = await apiClient.getVersions(app.owner.name, app.name, options);
      break;

    case "language":
      result = await apiClient.getLanguages(app.owner.name, app.name, options);
      break;

    case "place":
      result = await apiClient.getPlaces(app.owner.name, app.name, options);
      break;
  }
  return result;
}

type Props = {
  navigation: StackNavigationProp<StackParamList, "GridStats">;
  route: RouteProp<StackParamList, "GridStats">;
};
const GridStatsScreen = ({ navigation, route }: Props) => {
  const { title, type, app } = route.params;
  const [data, setData] = useState<CountsResult>(undefined);
  const now = new Date();
  useEffect(() => {
    (async () => {
      const data = await getData(app, type, {
        start: dateBefore(now, 7),
      });
      setData(data);
    })();
  }, []);
  const loadMoreCallback = useCallback(() => {
    let offset = data?.values?.length;
    if (offset) {
      const lastItem = data.values[data.values.length - 1];
      if (lastItem.key === "Other") {
        offset--;
      }
      (async () => {
        const newData = await getData(app, type, {
          start: dateBefore(now, 7),
          offset,
        });
        const data2: CountsResult = {
          ...data,
          values: [...data.values.slice(0, offset), ...newData.values],
        };
        setData(data2);
      })();
    }
  }, [data]);
  let content = undefined;
  if (data) {
    const maxValue = data.values[0].count;
    content = (
      <View style={{ padding: 16, flex: 1 }}>
        <FlatList
          data={data.values}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{item.key}</Text>
                <Text>{item.count}</Text>
              </View>
              <ProgressBar
                progress={item.count / maxValue}
                color={Colors.blue600}
                style={{ backgroundColor: "#efefef" }}
              />
            </View>
          )}
        />
        <Button style={{ marginTop: 20 }} onPress={loadMoreCallback}>
          <Text>Load more</Text>
        </Button>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      {content}
    </View>
  );
};

export default memo(GridStatsScreen);

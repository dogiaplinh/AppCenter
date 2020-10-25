import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo } from "react";
import { View, Text, FlatList } from "react-native";
import { Appbar, Card, Colors, ProgressBar } from "react-native-paper";
import { StackParamList } from "../models/ParamList";

type Props = {
  navigation: StackNavigationProp<StackParamList, "GridStats">;
  route: RouteProp<StackParamList, "GridStats">;
};
const GridStatsScreen = ({ navigation, route }: Props) => {
  const { title, data, labelField } = route.params;
  const maxValue = data.values[0].count;
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Card style={{ margin: 16, flex: 1 }}>
        <Card.Title title={title} />
        <Card.Content style={{ flex: 1 }}>
          <FlatList
            data={data.values}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 4 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>{item[labelField]}</Text>
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
        </Card.Content>
      </Card>
    </View>
  );
};

export default memo(GridStatsScreen);

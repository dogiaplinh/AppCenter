import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo } from "react";
import { View, Text, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { AppbarContent } from "react-native-paper/lib/typescript/src/components/Appbar/AppbarContent";
import { StackParamList } from "../models/ParamList";

type Props = {
  navigation: StackNavigationProp<StackParamList, "GridStats">;
  route: RouteProp<StackParamList, "GridStats">;
};
const GridStatsScreen = ({ navigation, route }: Props) => {
  const { title, data, labelField } = route.params;
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <FlatList
        data={data.values}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item[labelField]}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default memo(GridStatsScreen);

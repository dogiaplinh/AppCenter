import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useEffect } from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { StackParamList } from "../models/ParamList";

type Props = {
  navigation: StackNavigationProp<StackParamList, "EventDetails">;
  route: RouteProp<StackParamList, "EventDetails">;
};
const EventDetailsScreen = ({ navigation, route }: Props) => {
  const { name, app } = route.params;
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={name} />
        <Appbar.Action icon="refresh" />
      </Appbar.Header>
    </View>
  );
};

export default memo(EventDetailsScreen);

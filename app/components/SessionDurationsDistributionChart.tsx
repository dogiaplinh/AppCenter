import React, { memo } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { BarChart, XAxis } from "react-native-svg-charts";
import { CountItem, SessionDurationsDistribution } from "../models/ApiModels";

type Props = {
  distribution: SessionDurationsDistribution;
  style?: StyleProp<ViewStyle>;
};
const SessionDurationsDistributionChart = ({ distribution, style }: Props) => {
  const contentInset = { top: 5, bottom: 5 };
  const contentInset2 = { left: 25, right: 25 };
  return (
    <Card style={[style]}>
      <Card.Title title="Session Duration" />
      <Card.Content>
        <BarChart<CountItem>
          contentInset={contentInset}
          data={distribution.distribution}
          yAccessor={({ item }) => item.count}
          style={{ height: 200 }}
          svg={{ fill: "green" }}
        />
        <XAxis
          data={distribution.distribution}
          contentInset={contentInset2}
          xAccessor={({ item, index }) => index}
          formatLabel={(value, index) => distribution.distribution[index].key}
          style={{ minHeight: 50 }}
          svg={{
            fill: "black",
            rotation: 55,
            textAnchor: "start",
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default memo(SessionDurationsDistributionChart);

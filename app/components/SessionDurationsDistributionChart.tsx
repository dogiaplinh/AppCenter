import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { BarChart, XAxis } from "react-native-svg-charts";
import { CountItem, SessionDurationsDistribution } from "../models/ApiModels";
import * as d3 from "d3-scale";

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
          svg={{
            fill: "black",
            rotation: 0,
            translateX: 0,
            textAnchor: "middle",
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default SessionDurationsDistributionChart;

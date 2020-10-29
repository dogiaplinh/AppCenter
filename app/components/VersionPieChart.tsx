import React, { memo, useMemo } from "react";
import { FlatList, StyleProp, Text, View, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { PieChart, PieChartData } from "react-native-svg-charts";
import { CountsResult } from "../models/ApiModels";

type Props = {
  versions: CountsResult;
  style?: StyleProp<ViewStyle>;
};
type VersionPieData = PieChartData & { index: number };

const VersionPieChart = ({ versions, style }: Props) => {
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(0, 7);
  const chartData: VersionPieData[] = useMemo(
    () =>
      versions.values
        .map((x, index) => ({
          index,
          value: x.count,
          key: x.key,
          svg: { fill: randomColor() },
        }))
        .sort((a, b) => b.index - a.index),
    [versions],
  );
  const [latestVersion, percentage] = useMemo(() => {
    const lastItem = versions.values[versions.values.length - 1];
    return [lastItem.key, (lastItem.count / versions.total) * 100];
  }, [versions]);

  return (
    <Card style={[style]}>
      <Card.Title
        title="App Versions"
        subtitle={`Latest version: ${latestVersion} (${percentage.toFixed(2)}%)`}
      />
      <Card.Content>
        <PieChart<VersionPieData>
          style={{ height: 200 }}
          data={chartData}
          innerRadius={0}
          outerRadius={100}
          padAngle={0}
          sort={(a, b) => b.index - a.index}
        />
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={chartData}
            numColumns={4}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row", margin: 5 }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: item.svg?.fill,
                    marginRight: 10,
                  }}
                />
                <Text>{item.key}</Text>
              </View>
            )}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default memo(VersionPieChart);

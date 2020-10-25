import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { ActiveDeviceCounts } from "../models/ApiModels";
import { roundMaxValue } from "../utils/NumberUtils";
import * as d3 from "d3-scale";
import moment from "moment";

type Props = {
  activeDeviceCounts: ActiveDeviceCounts;
};
const ActiveDeviceChart = ({ activeDeviceCounts: counts }: Props) => {
  const yMax = useMemo(
    () =>
      roundMaxValue(
        Math.max(
          ...counts.daily.map((x) => x.count),
          ...counts.weekly.map((x) => x.count),
          ...counts.monthly.map((x) => x.count),
        ),
      ),
    [counts],
  );
  const [dailyCount, weeklyCount, monthlyCount] = useMemo(() => {
    const lastIndex = counts.daily.length - 1;
    return [
      counts.daily[lastIndex].count,
      counts.weekly[lastIndex].count,
      counts.monthly[lastIndex].count,
    ];
  }, [counts]);
  const [yAxisWidth, setYAxisWidth] = useState(0);
  const contentInset = { left: 5, right: 5, top: 5, bottom: 20 };
  return (
    <Card style={{ marginTop: 16 }}>
      <Card.Title title="Active Devices" />
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View onLayout={(e) => setYAxisWidth(e.nativeEvent.layout.width)}>
            <YAxis
              data={counts.daily}
              yAccessor={({ item }) => item.count}
              min={0}
              max={yMax}
              numberOfTicks={5}
              contentInset={contentInset}
              svg={{ fill: "grey" }}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <LineChart
              data={counts.monthly}
              yAccessor={({ item }) => item.count}
              yMin={0}
              yMax={yMax}
              contentInset={contentInset}
              svg={{ stroke: "#3192b3", strokeWidth: 2 }}
              style={styles.lineChartOverlay}
            />
            <LineChart
              data={counts.weekly}
              yAccessor={({ item }) => item.count}
              yMin={0}
              yMax={yMax}
              contentInset={contentInset}
              svg={{ stroke: "#9378CD", strokeWidth: 2 }}
              style={styles.lineChartOverlay}
            />
            <LineChart
              data={counts.daily}
              yAccessor={({ item }) => item.count}
              yMin={0}
              yMax={yMax}
              xAccessor={({ item }) => new Date(item.datetime).getTime()}
              contentInset={contentInset}
              svg={{ stroke: "#38A495", strokeWidth: 2 }}
              style={{ height: 200, marginLeft: 8, flex: 1 }}
            >
              <Grid
                direction={Grid.Direction.HORIZONTAL}
                ticks={d3.scaleLinear([0, yMax]).ticks(4)}
              />
            </LineChart>
          </View>
        </View>
        <XAxis
          data={counts.daily}
          contentInset={{ ...contentInset, left: contentInset.left + yAxisWidth }}
          xAccessor={({ item }) => new Date(item.datetime).getTime()}
          numberOfTicks={4}
          formatLabel={(v) => moment(new Date(v)).format("DD/MM")}
          style={{ marginLeft: 8 }}
          svg={{ fill: "grey" }}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.card}>
            <Text>Daily</Text>
            <Text>{dailyCount}</Text>
          </View>
          <View style={styles.card}>
            <Text>Weekly</Text>
            <Text>{weeklyCount}</Text>
          </View>
          <View style={styles.card}>
            <Text>Monthly</Text>
            <Text>{monthlyCount}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ActiveDeviceChart;

const styles = StyleSheet.create({
  lineChartOverlay: {
    marginLeft: 8,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  card: {
    flex: 1,
    alignItems: "center",
  },
});

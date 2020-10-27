import moment from "moment";
import React, { memo, useMemo, useState } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { YAxis, LineChart, Grid, XAxis } from "react-native-svg-charts";
import { DateTimeItem } from "../models/ApiModels";
import * as d3 from "d3-scale";

type Props = {
  counts: DateTimeItem[];
  style?: StyleProp<ViewStyle>;
  title: string;
  subtitle?: string;
};
const CountOverTimeChart = ({ counts, style, title, subtitle }: Props) => {
  const yMax = useMemo(() => {
    return Math.max(...counts.map((x) => x.count)) * 1.2;
  }, [counts]);
  const [yAxisWidth, setYAxisWidth] = useState(0);
  const contentInset = { left: 5, right: 5, top: 5, bottom: 20 };
  return (
    <Card style={[style]}>
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View onLayout={(e) => setYAxisWidth(e.nativeEvent.layout.width)}>
            <YAxis
              data={counts}
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
              data={counts}
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
          data={counts}
          contentInset={{ ...contentInset, left: contentInset.left + yAxisWidth }}
          xAccessor={({ item }) => new Date(item.datetime).getTime()}
          numberOfTicks={4}
          formatLabel={(v) => moment(new Date(v)).format("DD/MM")}
          style={{ marginLeft: 8 }}
          svg={{ fill: "grey" }}
        />
      </Card.Content>
    </Card>
  );
};

export default memo(CountOverTimeChart);

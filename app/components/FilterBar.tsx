import React, { memo, useMemo, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { DateRange, PrebuiltDateRange } from "../models/Models";
import { currentDay, dateBefore, makeDateRange } from "../utils/DateUtils";
import RNPickerSelect from "react-native-picker-select";
import { Card } from "react-native-paper";
import { Constants } from "../assets";

type Props = {
  versions?: string[];
  onChangeVersion?: (versions: string) => any;
  onChangeTime?: (dateRange: DateRange) => any;
};
type DateRangeItem = { label: string; range: DateRange; value: PrebuiltDateRange };
const FilterBar = ({ versions, onChangeVersion, onChangeTime }: Props) => {
  const now = currentDay();
  const versionValues = useMemo(
    () => [
      { label: "All versions", value: "" },
      ...(versions || []).reverse().map((x) => ({ label: x, value: x })),
    ],
    [versions],
  );
  const dateRages = useMemo<DateRangeItem[]>(() => {
    const output: DateRangeItem[] = [
      {
        label: "Last 7 days",
        value: "last7",
        range: makeDateRange("last7", now),
      },
      {
        label: "Last 14 days",
        value: "last14",
        range: makeDateRange("last14", now),
      },
      {
        label: "Last 30 days",
        value: "last30",
        range: makeDateRange("last30", now),
      },
      {
        label: "This month",
        value: "this_month",
        range: makeDateRange("this_month", now),
      },
    ];
    return output;
  }, [now]);
  return (
    <View style={{ marginHorizontal: 8, marginVertical: 8, flexDirection: "row" }}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <RNPickerSelect
            pickerProps={{ mode: "dropdown" }}
            onValueChange={(value) => onChangeVersion?.(value)}
            items={versionValues}
            placeholder={{}}
          />
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <RNPickerSelect
            pickerProps={{ mode: "dropdown" }}
            onValueChange={(_, index) => onChangeTime?.(dateRages[index].range)}
            items={dateRages}
            placeholder={{}}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default memo(FilterBar);

const isAndroid = Platform.OS === "android";
const styles = StyleSheet.create({
  card: {
    marginLeft: 8,
  },
  cardContent: {
    width: isAndroid ? 170 : 125,
    paddingVertical: isAndroid ? 0 : 8,
    paddingHorizontal: isAndroid ? 8 : undefined,
  },
});

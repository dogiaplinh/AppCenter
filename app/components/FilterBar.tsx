import React, { memo, useMemo, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DateRange } from "../models/Models";
import { currentDay, dateBefore } from "../utils/DateUtils";

type Props = {
  versions?: string[];
  onChangeVersion?: (versions: string) => any;
  onChangeTime?: (dateRange: DateRange) => any;
};
type DateRangeItem = { label: string; range: DateRange; value: string };
const FilterBar = ({ versions, onChangeVersion, onChangeTime }: Props) => {
  const now = currentDay();
  const versionValues = useMemo(
    () => [{ label: "All", value: "" }, ...(versions || []).map((x) => ({ label: x, value: x }))],
    [versions],
  );
  const dateRages = useMemo<DateRangeItem[]>(() => {
    const output: DateRangeItem[] = [
      {
        label: "Last 7 days",
        value: "last7",
        range: { start: dateBefore(now, 7), end: now },
      },
      {
        label: "Last 14 days",
        value: "last14",
        range: { start: dateBefore(now, 14), end: now },
      },
      {
        label: "Last 28 days",
        value: "last28",
        range: { start: dateBefore(now, 28), end: now },
      },
    ];
    return output;
  }, [now]);
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8, flexDirection: "row" }}>
      <DropDownPicker
        items={versionValues}
        placeholder="Version"
        style={{ width: 120 }}
        onChangeItem={(item) => {
          onChangeVersion?.(item.value);
        }}
        itemStyle={{ justifyContent: "flex-start" }}
        containerStyle={{ height: 40 }}
      />
      <DropDownPicker
        items={dateRages}
        placeholder="Time"
        style={{ width: 150, marginLeft: 16 }}
        itemStyle={{ justifyContent: "flex-start" }}
        onChangeItem={(item) => {
          onChangeTime?.(item.range);
        }}
        defaultValue="last7"
        containerStyle={{ height: 40 }}
      />
    </View>
  );
};

export default memo(FilterBar);

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { Appbar, Card, Colors, ProgressBar } from "react-native-paper";
import CountOverTimeChart from "../components/CountOverTimeChart";
import { CountsResult, EventCountResult, EventDeviceCountResult } from "../models/ApiModels";
import { StackParamList } from "../models/ParamList";
import apiClient from "../utils/ApiClient";

type Props = {
  navigation: StackNavigationProp<StackParamList, "EventDetails">;
  route: RouteProp<StackParamList, "EventDetails">;
};
const EventDetailsScreen = ({ navigation, route }: Props) => {
  const { name: eventName, app, dateRange } = route.params;
  const [eventCounts, setEventCounts] = useState<EventCountResult | undefined>(undefined);
  const [deviceCounts, setDeviceCounts] = useState<EventDeviceCountResult | undefined>(undefined);
  const [properties, setProperties] = useState<Record<string, CountsResult>>({});
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const result = await apiClient.getEventCount(app.owner.name, app.name, eventName, {
        ...dateRange,
      });
      if (isMounted) setEventCounts(result);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const result = await apiClient.getEventDeviceCount(app.owner.name, app.name, eventName, {
        ...dateRange,
      });
      if (isMounted) setDeviceCounts(result);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const properties = await apiClient.getEventProperties(app.owner.name, app.name, eventName);
      if (properties) {
        const output: Record<string, CountsResult> = {};
        for (const prop of properties) {
          const result = await apiClient.getEventPropertyCount(
            app.owner.name,
            app.name,
            eventName,
            prop,
            { ...dateRange },
          );
          if (result) output[prop] = result;
        }
        if (isMounted) setProperties(output);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={eventName} />
        <Appbar.Action icon="refresh" />
      </Appbar.Header>
      <ScrollView style={{ flex: 1 }}>
        {eventCounts && (
          <CountOverTimeChart
            style={styles.card}
            counts={eventCounts.count}
            title="Count"
            subtitle={`Total: ${eventCounts.total_count}`}
          />
        )}

        {deviceCounts && (
          <CountOverTimeChart
            style={styles.card}
            counts={deviceCounts.devices_count}
            title="Users"
            subtitle={`Total: ${deviceCounts.total_devices_with_event}`}
          />
        )}

        {Object.keys(properties).map((x) => {
          const data = properties[x];
          const maxValue = Math.max(...data.values.map((x) => x.count));
          return (
            <Card key={x} style={styles.card}>
              <Card.Title title={x} />
              <Card.Content>
                <FlatList
                  data={data.values}
                  style={{ flex: 1 }}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={{ paddingVertical: 4 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>{item.key}</Text>
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
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(EventDetailsScreen);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
